import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Shield, CheckCircle, Clock, AlertCircle, Upload, Grid, List } from 'lucide-react';

const DocVault = ({ user }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');

  const documents = [
    {
      id: 1, type: 'Aadhar Card', category: 'Identity', status: 'verified', uploadDate: '2024-01-15', expiryDate: null,
      fileSize: '2.4 MB', format: 'PDF', description: 'Government issued identity document',
      icon: Shield, color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30', statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 2, type: 'PAN Card', category: 'Tax', status: 'verified', uploadDate: '2024-01-16', expiryDate: null,
      fileSize: '1.8 MB', format: 'PDF', description: 'Permanent Account Number for tax purposes',
      icon: FileText, color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30', statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 3, type: 'Death Certificate', category: 'Legal', status: 'pending', uploadDate: '2024-02-01', expiryDate: null,
      fileSize: '3.2 MB', format: 'PDF', description: 'Official death certificate for claim processing',
      icon: AlertCircle, color: 'from-red-500/20 to-red-600/20 border-red-500/30', statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      id: 4, type: 'Policy VC', category: 'Verifiable Credential', status: 'verified', uploadDate: '2024-01-20', expiryDate: '2025-01-20',
      fileSize: '1.2 MB', format: 'JSON', description: 'Blockchain verifiable credential for insurance policy',
      icon: CheckCircle, color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30', statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 5, type: 'Driving License', category: 'Identity', status: 'expired', uploadDate: '2023-06-15', expiryDate: '2024-06-15',
      fileSize: '2.1 MB', format: 'PDF', description: 'Valid driving license for vehicle insurance',
      icon: Shield, color: 'from-gray-500/20 to-gray-600/20 border-gray-500/30', statusColor: 'bg-red-500/20 text-red-400 border-red-500/30'
    },
    {
      id: 6, type: 'Bank Statement', category: 'Financial', status: 'verified', uploadDate: '2024-01-25', expiryDate: null,
      fileSize: '4.5 MB', format: 'PDF', description: 'Recent bank statement for financial verification',
      icon: FileText, color: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30', statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    }
  ];

  const getStatusIcon = (status) => {
    const icons = { verified: CheckCircle, pending: Clock, expired: AlertCircle };
    const Icon = icons[status] || Clock;
    return <Icon className="w-4 h-4" />;
  };

  const filteredDocuments = documents.filter(doc => filterStatus === 'all' || doc.status === filterStatus);
  const handleView = (document) => console.log('Viewing document:', document.type);
  const handleDownload = (document) => console.log('Downloading document:', document.type);
  const handleUpload = () => console.log('Upload new document');

  const buttonClass = "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105";
  const cardClass = "glass shine border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300";
  const actionButtonClass = "border-white/20 text-white hover:bg-white/10 transition-all duration-200";

  return (
    <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><FileText className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight"><span className="text-white">Document</span> <span className="gradient-text">Vault</span></h1>
              <p className="text-xl text-gray-300">Secure storage for all your important documents</p>
            </div>
          </div>
        </div>
        <Button onClick={handleUpload} className={buttonClass}>
          <Upload className="w-5 h-5 mr-2" /> Upload Document
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', 'verified', 'pending', 'expired'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                filterStatus === status
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {status === 'all' ? 'All Documents' : status}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className={`${cardClass} hover:scale-[1.02]`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${doc.color}`}>
                      <doc.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{doc.type}</CardTitle>
                      <p className="text-gray-400 text-sm">{doc.category}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-medium border flex items-center gap-1 ${doc.statusColor}`}>
                    {getStatusIcon(doc.status)}
                    {doc.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{doc.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: 'Size', value: doc.fileSize },
                    { label: 'Format', value: doc.format },
                    { label: 'Uploaded', value: new Date(doc.uploadDate).toLocaleDateString() },
                    ...(doc.expiryDate ? [{ label: 'Expires', value: new Date(doc.expiryDate).toLocaleDateString() }] : [])
                  ].map((item, index) => (
                    <div key={index}>
                      <span className="text-gray-400">{item.label}:</span>
                      <p className="text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleView(doc)} className={`flex-1 ${actionButtonClass}`}>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(doc)} className={`flex-1 ${actionButtonClass}`}>
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className={cardClass}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${doc.color}`}>
                      <doc.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold">{doc.type}</h3>
                      <p className="text-gray-400 text-sm">{doc.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <p className="text-gray-400">Category: <span className="text-white">{doc.category}</span></p>
                      <p className="text-gray-400">Size: <span className="text-white">{doc.fileSize}</span></p>
                      <p className="text-gray-400">Uploaded: <span className="text-white">{new Date(doc.uploadDate).toLocaleDateString()}</span></p>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-medium border flex items-center gap-1 ${doc.statusColor}`}>
                      {getStatusIcon(doc.status)}
                      {doc.status}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(doc)} className={actionButtonClass}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(doc)} className={actionButtonClass}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No documents found</h3>
          <p className="text-gray-400 mb-6">
            {filterStatus === 'all' 
              ? "You haven't uploaded any documents yet." 
              : `No documents with status "${filterStatus}" found.`
            }
          </p>
          <Button onClick={handleUpload} className={buttonClass}>
            <Upload className="w-5 h-5 mr-2" /> Upload Your First Document
          </Button>
        </div>
      )}
    </div>
  );
};
export default DocVault;