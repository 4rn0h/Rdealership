import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CommunicationHistory = ({ communications, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value, selectedType);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    onSearch(searchTerm, type);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'inquiry':
        return 'MessageSquare';
      case 'call':
        return 'Phone';
      case 'email':
        return 'Mail';
      case 'test_drive':
        return 'Car';
      case 'meeting':
        return 'Users';
      default:
        return 'MessageCircle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'inquiry':
        return 'text-accent';
      case 'call':
        return 'text-success';
      case 'email':
        return 'text-warning';
      case 'test_drive':
        return 'text-primary';
      case 'meeting':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const communicationTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'inquiry', label: 'Inquiries' },
    { value: 'call', label: 'Calls' },
    { value: 'email', label: 'Emails' },
    { value: 'test_drive', label: 'Test Drives' },
    { value: 'meeting', label: 'Meetings' }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search communications..."
              value={searchTerm}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {communicationTypes?.map((type) => (
              <button
                key={type?.value}
                onClick={() => handleTypeFilter(type?.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium luxury-micro-transition ${
                  selectedType === type?.value
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {type?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Communications List */}
      <div className="space-y-4">
        {communications?.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No Communications Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedType !== 'all' ?'Try adjusting your search or filter criteria.' :'Your communication history will appear here.'}
            </p>
          </div>
        ) : (
          communications?.map((comm) => (
            <div key={comm?.id} className="bg-card border border-border rounded-lg luxury-shadow-subtle overflow-hidden">
              {/* Mobile Layout */}
              <div className="lg:hidden p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getTypeColor(comm?.type)}`}>
                      <Icon name={getTypeIcon(comm?.type)} size={18} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-foreground text-sm">
                          {comm?.subject || comm?.type?.charAt(0)?.toUpperCase() + comm?.type?.slice(1)}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {comm?.vehicle?.name || 'General Communication'}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comm?.date)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-foreground mb-3 line-clamp-2">
                      {comm?.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {comm?.agent && (
                          <>
                            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-accent-foreground">
                                {comm?.agent?.name?.charAt(0)}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {comm?.agent?.name}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(comm?.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:block p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${getTypeColor(comm?.type)}`}>
                      <Icon name={getTypeIcon(comm?.type)} size={20} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {comm?.subject || comm?.type?.charAt(0)?.toUpperCase() + comm?.type?.slice(1)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {comm?.vehicle?.name || 'General Communication'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {formatDate(comm?.date)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(comm?.date)}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground mb-4 leading-relaxed">
                      {comm?.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {comm?.agent && (
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-accent-foreground">
                                {comm?.agent?.name?.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              Agent: {comm?.agent?.name}
                            </span>
                          </div>
                        )}
                        {comm?.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(5)]?.map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={14}
                                className={i < comm?.rating ? 'text-accent fill-current' : 'text-muted-foreground'}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {comm?.attachments && comm?.attachments?.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {comm?.attachments?.length} attachment{comm?.attachments?.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Load More Button */}
      {communications?.length > 0 && (
        <div className="text-center">
          <Button variant="outline" iconName="ChevronDown" iconPosition="left">
            Load More Communications
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommunicationHistory;