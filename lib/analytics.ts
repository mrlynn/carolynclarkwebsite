import { connectToDatabase } from './db';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { ObjectId } from 'mongodb';

export interface MetricsData {
  thisMonthRevenue: number;
  appointmentsBooked: number;
  completionRate: number;
  avgRating: number;
  newClients: number;
  returnClientRate: number;
  totalServicesSold: number;
  cancellationRate: number;
}

export interface RevenueData {
  monthlyTrend: { month: string; revenue: number }[];
  byService: { service: string; revenue: number; units: number }[];
  byDuration: { duration: number; revenue: number; units: number }[];
}

export interface ClientData {
  total: number;
  newThisMonth: number;
  returnRate: number;
  topByBookings: { name: string; email: string; bookings: number; revenue: number }[];
}

export interface ServiceData {
  _id?: ObjectId;
  name: string;
  unitsThisMonth: number;
  revenueThisMonth: number;
  avgPricePerBooking: number;
  percentOfTotal: number;
  trend: number;
}

export interface BookingHeatmapData {
  day: number;
  hour: number;
  count: number;
}

export interface TestimonialData {
  avgRating: number;
  breakdown: { pending: number; approved: number; rejected: number };
  recent: { client_name: string; rating: number; title: string; content: string }[];
}

export interface UpcomingAppointmentData {
  _id: string;
  client_name: string;
  client_email: string;
  scheduled_at: Date;
  duration_minutes: number;
  total_price: number;
  service_name?: string;
  status: string;
}

export interface DashboardData {
  metrics: MetricsData;
  revenue: RevenueData;
  clients: ClientData;
  services: ServiceData[];
  bookingHeatmap: BookingHeatmapData[];
  upcomingValue: number;
  projectedRevenue: number;
  testimonials: TestimonialData;
  upcoming: UpcomingAppointmentData[];
  weeklySummary: {
    weekRevenue: number;
    weekAppointments: { completed: number; scheduled: number; cancelled: number };
    newReviews: number;
    bestDay: { day: string; revenue: number; bookings: number };
  };
}

// Get completed appointments in a date range
async function getCompletedAppointments(startDate: Date, endDate: Date) {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');
  return await appointmentsCollection
    .find({
      status: 'completed',
      scheduled_at: { $gte: startDate, $lte: endDate },
    })
    .toArray();
}

// Get all appointments in a date range
async function getAllAppointments(startDate: Date, endDate: Date) {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');
  return await appointmentsCollection
    .find({
      scheduled_at: { $gte: startDate, $lte: endDate },
    })
    .toArray();
}

export async function getMonthlyRevenue(year: number, month: number): Promise<number> {
  const start = startOfMonth(new Date(year, month - 1, 1));
  const end = endOfMonth(start);

  const appointments = await getCompletedAppointments(start, end);
  return appointments.reduce((sum: number, apt: any) => sum + (apt.total_price || 0), 0);
}

export async function getRevenueByService(startDate: Date, endDate: Date): Promise<any[]> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');
  const servicesCollection = db.collection('services');

  // Get all services for mapping
  const services = await servicesCollection.find().toArray();
  const serviceMap = new Map();
  services.forEach((svc: any) => {
    serviceMap.set(svc._id.toString(), svc.name);
  });

  const pipeline = [
    {
      $match: {
        status: 'completed',
        scheduled_at: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: '$service_id',
        revenue: { $sum: '$total_price' },
        units: { $sum: 1 },
      },
    },
    {
      $project: {
        service: {
          $cond: {
            if: { $eq: ['$_id', null] },
            then: 'Unknown Service',
            else: '$_id',
          },
        },
        revenue: 1,
        units: 1,
      },
    },
  ];

  const result = await appointmentsCollection.aggregate(pipeline).toArray();

  // Map service IDs to names
  return result.map((item: any) => ({
    ...item,
    service: serviceMap.get(item.service?.toString()) || item.service || 'Unknown Service',
  }));
}

export async function getRevenueByDuration(startDate: Date, endDate: Date): Promise<any[]> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');
  const pipeline = [
    {
      $match: {
        status: 'completed',
        scheduled_at: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: '$duration_minutes',
        revenue: { $sum: '$total_price' },
        units: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        duration: '$_id',
        revenue: 1,
        units: 1,
        _id: 0,
      },
    },
  ];

  return await appointmentsCollection.aggregate(pipeline).toArray();
}

export async function getNewClientsCount(startDate: Date, endDate: Date): Promise<number> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');

  // Get all completed appointments for these clients in this date range
  const newClientEmails = await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: 'completed',
          scheduled_at: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$client_email',
          firstAppointment: { $min: '$scheduled_at' },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          firstAppointment: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $count: 'count',
      },
    ])
    .toArray();

  return newClientEmails[0]?.count || 0;
}

export async function getReturnClientRate(startDate: Date, endDate: Date): Promise<number> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');

  const results = await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: 'completed',
          scheduled_at: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$client_email',
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          returning: { $sum: { $cond: [{ $gte: ['$count', 2] }, 1, 0] } },
        },
      },
      {
        $project: {
          rate: { $divide: ['$returning', '$total'] },
        },
      },
    ])
    .toArray();

  return results[0]?.rate || 0;
}

export async function getCompletionRate(startDate: Date, endDate: Date): Promise<number> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');

  const results = await appointmentsCollection
    .aggregate([
      {
        $match: {
          scheduled_at: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
        },
      },
      {
        $project: {
          rate: { $divide: ['$completed', '$total'] },
        },
      },
    ])
    .toArray();

  return results[0]?.rate || 0;
}

export async function getCancellationRate(startDate: Date, endDate: Date): Promise<number> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');

  const results = await appointmentsCollection
    .aggregate([
      {
        $match: {
          scheduled_at: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          cancelled: { $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] } },
        },
      },
      {
        $project: {
          rate: { $divide: ['$cancelled', '$total'] },
        },
      },
    ])
    .toArray();

  return results[0]?.rate || 0;
}

export async function getUpcomingAppointmentsValue(days: number = 30): Promise<number> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);

  const appointments = await appointmentsCollection
    .find({
      status: 'confirmed',
      scheduled_at: { $gte: new Date(), $lte: futureDate },
    })
    .toArray();

  return appointments.reduce((sum, apt) => sum + (apt.total_price || 0), 0);
}

export async function getMonthlyRevenueTrend(months: number = 12): Promise<{ month: string; revenue: number }[]> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const results = await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: 'completed',
          scheduled_at: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - months)),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$scheduled_at' },
            month: { $month: '$scheduled_at' },
          },
          revenue: { $sum: '$total_price' },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
      {
        $project: {
          month: { $arrayElemAt: [monthNames, { $subtract: ['$_id.month', 1] }] },
          revenue: 1,
          _id: 0,
        },
      },
    ])
    .toArray();

  return results as { month: string; revenue: number }[];
}

export async function getBookingsByHourAndDay(): Promise<BookingHeatmapData[]> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');

  const results = await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'completed'] },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfWeek: '$scheduled_at' },
            hour: { $hour: '$scheduled_at' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          day: '$_id.day',
          hour: '$_id.hour',
          count: 1,
          _id: 0,
        },
      },
    ])
    .toArray();

  return results as BookingHeatmapData[];
}

export async function getAverageTestimonialRating(): Promise<number> {
  const { db } = await connectToDatabase();
  const testimonialsCollection = db.collection('testimonials');

  const results = await testimonialsCollection
    .aggregate([
      {
        $match: {
          status: 'approved',
        },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
        },
      },
    ])
    .toArray();

  return Math.round((results[0]?.avgRating || 0) * 10) / 10;
}

export async function getTestimonialBreakdown(): Promise<{ pending: number; approved: number; rejected: number }> {
  const { db } = await connectToDatabase();
  const testimonialsCollection = db.collection('testimonials');

  const results = await testimonialsCollection
    .aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const breakdown = { pending: 0, approved: 0, rejected: 0 };
  results.forEach((item) => {
    if (item._id in breakdown) {
      breakdown[item._id as keyof typeof breakdown] = item.count;
    }
  });

  return breakdown;
}

export async function getRecentTestimonials(limit: number = 4) {
  const { db } = await connectToDatabase();
  const testimonialsCollection = db.collection('testimonials');

  return await testimonialsCollection
    .find({ status: 'approved' })
    .sort({ created_at: -1 })
    .limit(limit)
    .toArray();
}

export async function getTotalClientCount(): Promise<number> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');

  const results = await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: 'completed',
        },
      },
      {
        $group: {
          _id: '$client_email',
        },
      },
      {
        $count: 'count',
      },
    ])
    .toArray();

  return results[0]?.count || 0;
}

export async function getTopClientsByBookings(startDate: Date, endDate: Date, limit: number = 5) {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');

  return await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: 'completed',
          scheduled_at: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            email: '$client_email',
            name: '$client_name',
          },
          bookings: { $sum: 1 },
          revenue: { $sum: '$total_price' },
        },
      },
      {
        $sort: { bookings: -1 },
      },
      {
        $limit: limit,
      },
      {
        $project: {
          name: '$_id.name',
          email: '$_id.email',
          bookings: 1,
          revenue: 1,
          _id: 0,
        },
      },
    ])
    .toArray();
}

export async function getUpcomingAppointments(days: number = 7): Promise<UpcomingAppointmentData[]> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');
  const servicesCollection = db.collection('services');
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);

  // Get all services for mapping
  const servicesData = await servicesCollection.find().toArray();
  const serviceMap = new Map();
  servicesData.forEach((svc: any) => {
    serviceMap.set(svc._id.toString(), svc.name);
  });

  const pipeline = [
    {
      $match: {
        status: { $in: ['pending', 'confirmed'] },
        scheduled_at: { $gte: new Date(), $lte: futureDate },
      },
    },
    {
      $sort: { scheduled_at: 1 },
    },
    {
      $project: {
        _id: { $toString: '$_id' },
        client_name: 1,
        client_email: 1,
        scheduled_at: 1,
        duration_minutes: 1,
        total_price: 1,
        status: 1,
        service_id: 1,
      },
    },
  ];

  const results = (await appointmentsCollection.aggregate(pipeline).toArray()) as any[];

  // Map service names - handle both ObjectId and string formats
  return results.map((apt) => {
    let serviceName = 'Unknown Service';

    if (apt.service_id) {
      // Try direct ObjectId string conversion
      const serviceIdStr = apt.service_id.toString ? apt.service_id.toString() : String(apt.service_id);
      serviceName = serviceMap.get(serviceIdStr) || 'Unknown Service';
    }

    return {
      ...apt,
      service_name: serviceName,
    };
  });
}

export async function getWeeklySummary() {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);

  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');

  // Get week revenue
  const completed = await getCompletedAppointments(weekStart, weekEnd);
  const weekRevenue = completed.reduce((sum, apt) => sum + (apt.total_price || 0), 0);

  // Get week appointments breakdown
  const weekAppointments = await getAllAppointments(weekStart, weekEnd);
  const breakdown = {
    completed: weekAppointments.filter((a) => a.status === 'completed').length,
    scheduled: weekAppointments.filter((a) => a.status === 'confirmed').length,
    cancelled: weekAppointments.filter((a) => a.status === 'cancelled').length,
  };

  // Get new reviews this week
  const testimonialsCollection = db.collection('testimonials');
  const newReviews = await testimonialsCollection.countDocuments({
    status: 'approved',
    approved_at: { $gte: weekStart, $lte: weekEnd },
  });

  // Get best day
  const bestDayResult = await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: 'completed',
          scheduled_at: { $gte: weekStart, $lte: weekEnd },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$scheduled_at' },
          },
          revenue: { $sum: '$total_price' },
          bookings: { $sum: 1 },
        },
      },
      {
        $sort: { revenue: -1 },
      },
      {
        $limit: 1,
      },
    ])
    .toArray();

  const bestDay = bestDayResult[0]
    ? {
        day: bestDayResult[0]._id,
        revenue: bestDayResult[0].revenue,
        bookings: bestDayResult[0].bookings,
      }
    : {
        day: 'No data',
        revenue: 0,
        bookings: 0,
      };

  return {
    weekRevenue,
    weekAppointments: breakdown,
    newReviews,
    bestDay,
  };
}

export async function getServiceAnalytics(startDate: Date, endDate: Date): Promise<ServiceData[]> {
  const { db } = await connectToDatabase();
  const appointmentsCollection = db.collection('appointments');
  const servicesCollection = db.collection('services');

  // Get all services for mapping
  const services = await servicesCollection.find().toArray();
  const serviceMap = new Map();
  services.forEach((svc: any) => {
    serviceMap.set(svc._id.toString(), svc.name);
  });

  const results = await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: 'completed',
          scheduled_at: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$service_id',
          units: { $sum: 1 },
          revenue: { $sum: '$total_price' },
        },
      },
      {
        $project: {
          _id: 1,
          units: 1,
          revenue: 1,
          avgPrice: { $divide: ['$revenue', '$units'] },
        },
      },
    ])
    .toArray();

  // Calculate total revenue and percentages
  const totalRevenue = results.reduce((sum: number, item: any) => sum + item.revenue, 0);

  // Get last month for comparison
  const lastMonthStart = new Date(startDate);
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
  const lastMonthEnd = new Date(endDate);
  lastMonthEnd.setMonth(lastMonthEnd.getMonth() - 1);

  const lastMonthResults = await appointmentsCollection
    .aggregate([
      {
        $match: {
          status: 'completed',
          scheduled_at: { $gte: lastMonthStart, $lte: lastMonthEnd },
        },
      },
      {
        $group: {
          _id: '$service_id',
          revenue: { $sum: '$total_price' },
        },
      },
    ])
    .toArray();

  const lastMonthMap = new Map(lastMonthResults.map((r: any) => [r._id.toString(), r.revenue]));

  return results.map((item: any) => ({
    _id: item._id,
    name: serviceMap.get(item._id?.toString()) || 'Unknown Service',
    unitsThisMonth: item.units,
    revenueThisMonth: item.revenue,
    avgPricePerBooking: Math.round(item.avgPrice * 100) / 100,
    percentOfTotal: totalRevenue > 0 ? Math.round((item.revenue / totalRevenue) * 100) : 0,
    trend:
      lastMonthMap.get(item._id?.toString()) && lastMonthMap.get(item._id?.toString()) > 0
        ? Math.round(((item.revenue - (lastMonthMap.get(item._id?.toString()) || 0)) / (lastMonthMap.get(item._id?.toString()) || 1)) * 100)
        : 100,
  }));
}

export async function getDashboardData(): Promise<DashboardData> {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);

  const thisMonthRevenue = await getMonthlyRevenue(now.getFullYear(), now.getMonth() + 1);

  const { db } = await connectToDatabase();
  const appointmentsBooked = await db.collection('appointments').countDocuments({
    scheduled_at: { $gte: thisMonthStart, $lte: thisMonthEnd },
  });

  const [
    completionRate,
    avgRating,
    newClients,
    returnClientRate,
    cancellationRate,
    revenueByService,
    revenueByDuration,
    services,
    bookingHeatmap,
    upcomingValue,
    upcoming,
    weeklySummary,
  ] = await Promise.all([
    getCompletionRate(thisMonthStart, thisMonthEnd),
    getAverageTestimonialRating(),
    getNewClientsCount(thisMonthStart, thisMonthEnd),
    getReturnClientRate(thisMonthStart, thisMonthEnd),
    getCancellationRate(thisMonthStart, thisMonthEnd),
    getRevenueByService(thisMonthStart, thisMonthEnd),
    getRevenueByDuration(thisMonthStart, thisMonthEnd),
    getServiceAnalytics(thisMonthStart, thisMonthEnd),
    getBookingsByHourAndDay(),
    getUpcomingAppointmentsValue(30),
    getUpcomingAppointments(7),
    getWeeklySummary(),
  ]);

  const total = await getTotalClientCount();
  const top = await getTopClientsByBookings(thisMonthStart, thisMonthEnd);
  const clientDataResolved: ClientData = {
    total,
    newThisMonth: newClients,
    returnRate: returnClientRate,
    topByBookings: top as any,
  };

  const avgRatingVal = await getAverageTestimonialRating();
  const breakdownVal = await getTestimonialBreakdown();
  const recentVal = await getRecentTestimonials();
  const testimonialsResolved: TestimonialData = {
    avgRating: avgRatingVal,
    breakdown: breakdownVal,
    recent: recentVal.slice(0, 4) as any,
  };

  return {
    metrics: {
      thisMonthRevenue,
      appointmentsBooked,
      completionRate: Math.round(completionRate * 100),
      avgRating,
      newClients,
      returnClientRate: Math.round(returnClientRate * 100),
      totalServicesSold: appointmentsBooked,
      cancellationRate: Math.round(cancellationRate * 100),
    },
    revenue: {
      monthlyTrend: await getMonthlyRevenueTrend(12),
      byService: revenueByService,
      byDuration: revenueByDuration,
    },
    clients: clientDataResolved,
    services,
    bookingHeatmap,
    upcomingValue,
    projectedRevenue: Math.round(thisMonthRevenue * 1.1),
    testimonials: testimonialsResolved,
    upcoming,
    weeklySummary,
  };
}
