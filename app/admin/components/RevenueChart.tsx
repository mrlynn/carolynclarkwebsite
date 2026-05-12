'use client';

import { Box, Card, CardContent, Typography, Tab, Tabs } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RevenueData } from '@/lib/analytics';
import { useState } from 'react';

interface RevenueChartProps {
  data: RevenueData;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
        border: '1px solid #f5e6d3',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Revenue Insights
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ minHeight: 40 }}>
            <Tab label="Monthly Trend" />
            <Tab label="By Service" />
            <Tab label="By Duration" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0d5c8" />
                <XAxis dataKey="month" stroke="#5a4e45" />
                <YAxis stroke="#5a4e45" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fef8f3',
                    border: '1px solid #f5e6d3',
                    borderRadius: 8,
                  }}
                  formatter={(value: any) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f5a860"
                  dot={{ fill: '#f5a860', r: 5 }}
                  activeDot={{ r: 7 }}
                  strokeWidth={2}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byService}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0d5c8" />
                <XAxis dataKey="service" stroke="#5a4e45" />
                <YAxis stroke="#5a4e45" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fef8f3',
                    border: '1px solid #f5e6d3',
                    borderRadius: 8,
                  }}
                  formatter={(value: any) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#f5a860" name="Revenue" radius={[8, 8, 0, 0]} />
                <Bar dataKey="units" fill="#7fbaa5" name="Units Sold" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byDuration}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0d5c8" />
                <XAxis dataKey="duration" stroke="#5a4e45" label={{ value: 'Duration (minutes)', position: 'insideBottomRight', offset: -5 }} />
                <YAxis stroke="#5a4e45" yAxisId="left" label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} />
                <YAxis stroke="#5a4e45" yAxisId="right" orientation="right" label={{ value: 'Units Sold', angle: 90, position: 'insideRight' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fef8f3',
                    border: '1px solid #f5e6d3',
                    borderRadius: 8,
                  }}
                  formatter={(value: any) => {
                    if (typeof value === 'number' && value > 100) {
                      return `$${value.toLocaleString()}`;
                    }
                    return value;
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="#f5a860" name="Revenue ($)" radius={[8, 8, 0, 0]} />
                <Bar yAxisId="right" dataKey="units" fill="#7fbaa5" name="Units Sold" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
