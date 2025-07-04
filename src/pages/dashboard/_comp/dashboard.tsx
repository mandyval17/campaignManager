import { TMetric } from '@/components/types/models/metric.model';
import { MyDialog, MyDialogContent, MyDialogTitle } from '@/components/ui/modal';
import { useAuth } from '@/hooks/auth/useAuth';
import MetricService from '@/services/metric/metric.service';
import { Logout, PublishSharp, Search } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import MouseIcon from '@mui/icons-material/Mouse';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Button, Card, CardContent, CardHeader, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { CampaignList } from './campagin-list';
import MetricForm from './metric-form';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openMetricModal, setOpenMetricModal] = useState(false);
  const [editingMetric, setEditingMetric] = useState<TMetric | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMetricId, setDeleteMetricId] = useState<string | null>(null);

  const { data: metrics, isLoading } = MetricService.useGetAllMetrics();
  const deleteMetricMutation = MetricService.useDeleteMetricMutation();

  const campaigns: TMetric[] = metrics?.data ?? [];

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate stats from campaigns (not filtered)
  const totalCampaigns = campaigns.length;
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

  const handleEdit = (metric: TMetric) => {
    setEditingMetric(metric);
    setOpenMetricModal(true);
  };

  const handleDelete = (id: string) => {
    setDeleteMetricId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteMetricId) {
      deleteMetricMutation.mutate(deleteMetricId);
    }
    setDeleteDialogOpen(false);
    setDeleteMetricId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteMetricId(null);
  };

  const handleModalClose = () => {
    setOpenMetricModal(false);
    setEditingMetric(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <Avatar className="bg-gray-200 text-blue-700" sx={{ width: 48, height: 48 }}>
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Marketing Dashboard</h1>
                <p className="text-md text-gray-500">Welcome back, {user?.email}</p>
              </div>
            </div>
            <Button variant="outlined" onClick={logout} className="flex items-center gap-2" sx={{ borderRadius: '9999px', px: 3, py: 1, fontWeight: 'bold', borderColor: '#e0e7ef', color: '#2563eb', '&:hover': { bgcolor: '#f1f5f9', borderColor: '#2563eb' } }}>
              <Logout className="h-5 w-5 text-blue-600" onClick={logout} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="shadow rounded-xl bg-white border border-gray-100">
            <CardContent className="flex flex-col items-center">
              <div className="bg-blue-50 p-2 rounded-full mb-2">
                <BarChartIcon sx={{ color: '#2563eb', fontSize: 32 }} />
              </div>
              <Typography component="div" variant="h6" className="text-gray-500 mb-1">Total Campaigns</Typography>
              <Typography component="div" variant="h4" className="font-bold text-gray-900">{totalCampaigns}</Typography>
            </CardContent>
          </Card>
          <Card className="shadow rounded-xl bg-white border border-gray-100">
            <CardContent className="flex flex-col items-center">
              <div className="bg-blue-50 p-2 rounded-full mb-2">
                <VisibilityIcon sx={{ color: '#2563eb', fontSize: 32 }} />
              </div>
              <Typography component="div" variant="h6" className="text-gray-500 mb-1">Total Impressions</Typography>
              <Typography component="div" variant="h4" className="font-bold text-gray-900">{totalImpressions}</Typography>
            </CardContent>
          </Card>
          <Card className="shadow rounded-xl bg-white border border-gray-100">
            <CardContent className="flex flex-col items-center">
              <div className="bg-blue-50 p-2 rounded-full mb-2">
                <MouseIcon sx={{ color: '#2563eb', fontSize: 32 }} />
              </div>
              <Typography component="div" variant="h6" className="text-gray-500 mb-1">Total Clicks</Typography>
              <Typography component="div" variant="h4" className="font-bold text-gray-900">{totalClicks}</Typography>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              sx={{ width: '100%', border: '1px solid #e0e7ef', paddingLeft: '2.5rem', height: '48px', backgroundColor: 'white', boxShadow: 'none' }}
              aria-placeholder='Search campaigns...'
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 text-base"
            />
          </div>
          <Button onClick={() => setOpenMetricModal(true)} sx={{ height: '48px', bgcolor: '#2563eb', color: 'white', fontWeight: 'bold', borderRadius: '9999px', px: 4, textTransform: 'none', fontSize: '1rem', boxShadow: 'none', '&:hover': { bgcolor: '#1d4ed8' } }} variant="contained" className="flex items-center gap-2">
            <PublishSharp className="h-5 w-5" />
            Add Campaign
          </Button>
        </div>

        <Card className="shadow rounded-xl bg-white border border-gray-100">
          <CardHeader
            title={<span className="font-bold text-gray-900 text-lg">Campaign Metrics</span>}
            subheader={<span className="text-gray-500">View and manage your marketing campaigns</span>}
            action={
              searchTerm ? (
                <Chip
                  label={`${filteredCampaigns.length} of ${campaigns.length} campaigns`}
                  size="small"
                  sx={{ bgcolor: '#f1f5f9', color: '#2563eb', fontWeight: 'bold' }}
                />
              ) : null
            }
          />
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <CircularProgress />
              </div>
            ) : (
              <CampaignList
                campaigns={filteredCampaigns}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </CardContent>
        </Card>
        <MyDialog open={openMetricModal} onClose={handleModalClose}>
          <MyDialogTitle>{editingMetric ? 'Edit Campaign' : 'Add New Campaign'}</MyDialogTitle>
          <MyDialogContent>
            <MetricForm
              onSuccess={handleModalClose}
              initialMetric={editingMetric}
            />
          </MyDialogContent>
        </MyDialog>
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Delete Campaign</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  )
}