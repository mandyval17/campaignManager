import { TMetric } from '@/components/types/models/metric.model';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

interface CampaignListProps {
  campaigns: TMetric[];
  onEdit?: (campaign: TMetric) => void;
  onDelete?: (id: string) => void;
}

export const CampaignList: React.FC<CampaignListProps> = ({ campaigns, onEdit, onDelete }) => {
  if (campaigns.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Typography variant="h6" color="textSecondary">
          No campaigns
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Get started by creating a new campaign.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className="rounded-xl shadow border border-gray-100">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-50">
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px', color: '#374151', textTransform: 'uppercase', letterSpacing: 1, py: 2 }}>Campaign</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px', color: '#374151', textTransform: 'uppercase', letterSpacing: 1, py: 2 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px', color: '#374151', textTransform: 'uppercase', letterSpacing: 1, py: 2 }}>Impressions</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px', color: '#374151', textTransform: 'uppercase', letterSpacing: 1, py: 2 }}>Clicks</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px', color: '#374151', textTransform: 'uppercase', letterSpacing: 1, py: 2 }}>Conversions</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px', color: '#374151', textTransform: 'uppercase', letterSpacing: 1, py: 2 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign, idx) => (
            <TableRow key={campaign.id} hover className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} style={{ transition: 'background 0.2s' }}>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body1" className="font-semibold text-gray-900">{campaign.campaignName}</Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" className="text-gray-500">
                  {new Date(campaign.date).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" className="text-gray-900 font-medium">{campaign.impressions.toLocaleString()}</Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" className="text-gray-900 font-medium">{campaign.clicks.toLocaleString()}</Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" className="text-gray-900 font-medium">{campaign.conversions.toLocaleString()}</Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Box display="flex" gap={1}>
                  {onEdit && (
                    <IconButton color="primary" size="small" sx={{ border: '1px solid #e5e7eb', bgcolor: 'white', '&:hover': { bgcolor: '#f3f4f6' } }} onClick={() => onEdit(campaign)}>
                      <EditIcon fontSize="small" sx={{ color: '#2563eb' }} />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton color="error" size="small" sx={{ border: '1px solid #e5e7eb', bgcolor: 'white', '&:hover': { bgcolor: '#f3f4f6' } }} onClick={() => onDelete(campaign.id)}>
                      <DeleteIcon fontSize="small" sx={{ color: '#ef4444' }} />
                    </IconButton>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
