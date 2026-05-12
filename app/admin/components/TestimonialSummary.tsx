'use client';

import { Box, Card, CardContent, Typography, Stack, Rating, Chip, Divider } from '@mui/material';
import { Star, CheckCircle } from '@mui/icons-material';
import { TestimonialData } from '@/lib/analytics';

interface TestimonialSummaryProps {
  data: TestimonialData;
}

export default function TestimonialSummary({ data }: TestimonialSummaryProps) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
        border: '1px solid #f5e6d3',
      }}
    >
      <CardContent>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star sx={{ color: '#f5c66f' }} />
              Client Feedback
            </Typography>
          </Box>

          {/* Rating Overview */}
          <Box sx={{ p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Average Rating
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#f5a860' }}>
                {data.avgRating}
              </Typography>
              <Rating value={data.avgRating} readOnly precision={0.1} size="small" />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                / 5.0
              </Typography>
            </Box>
          </Box>

          {/* Status Breakdown */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Testimonial Status
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<CheckCircle />}
                label={`${data.breakdown.approved} Approved`}
                color="success"
                variant="outlined"
                size="small"
              />
              <Chip
                label={`${data.breakdown.pending} Pending`}
                variant="outlined"
                size="small"
              />
              <Chip
                label={`${data.breakdown.rejected} Rejected`}
                variant="outlined"
                size="small"
              />
            </Stack>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Recent Testimonials */}
          {data.recent && data.recent.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                Latest Reviews
              </Typography>
              <Stack spacing={1.5}>
                {data.recent.slice(0, 3).map((testimonial: any, idx) => (
                  <Box key={idx} sx={{ p: 1, backgroundColor: '#fff9f5', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>
                        {testimonial.client_name}
                      </Typography>
                      <Rating value={testimonial.rating} readOnly size="small" />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      "{testimonial.title}"
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
