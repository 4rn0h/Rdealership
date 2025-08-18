import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = useState(['vehicles']);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarSections = [
    {
      id: 'vehicles',
      label: 'Vehicle Management',
      icon: 'Car',
      items: [
        {
          label: 'All Vehicles',
          path: '/admin-vehicle-management',
          icon: 'List',
          description: 'Manage inventory'
        },
        {
          label: 'Add Vehicle',
          path: '/admin-vehicle-management/add',
          icon: 'Plus',
          description: 'Add new vehicle'
        },
        {
          label: 'Categories',
          path: '/admin-vehicle-management/categories',
          icon: 'Tag',
          description: 'Manage categories'
        }
      ]
    },
    {
      id: 'inquiries',
      label: 'Customer Inquiries',
      icon: 'MessageSquare',
      items: [
        {
          label: 'All Inquiries',
          path: '/admin/inquiries',
          icon: 'Inbox',
          description: 'View all inquiries'
        },
        {
          label: 'Pending',
          path: '/admin/inquiries/pending',
          icon: 'Clock',
          description: 'Pending responses'
        },
        {
          label: 'Responded',
          path: '/admin/inquiries/responded',
          icon: 'CheckCircle',
          description: 'Completed inquiries'
        }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      items: [
        {
          label: 'All Users',
          path: '/admin/users',
          icon: 'UserCheck',
          description: 'Manage users'
        },
        {
          label: 'Sales Agents',
          path: '/admin/users/agents',
          icon: 'Briefcase',
          description: 'Sales team'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      items: [
        {
          label: 'Dashboard',
          path: '/admin/analytics',
          icon: 'TrendingUp',
          description: 'Performance metrics'
        },
        {
          label: 'Sales Reports',
          path: '/admin/analytics/sales',
          icon: 'DollarSign',
          description: 'Sales analytics'
        }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border luxury-shadow-medium transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="font-heading font-semibold text-foreground">
              Admin Panel
            </h2>
          )}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-muted luxury-micro-transition"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-2">
            {sidebarSections?.map((section) => (
              <div key={section?.id} className="px-3">
                {/* Section Header */}
                <button
                  onClick={() => !isCollapsed && toggleSection(section?.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted luxury-micro-transition ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                  title={isCollapsed ? section?.label : ''}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={section?.icon} size={18} className="text-accent" />
                    {!isCollapsed && (
                      <span className="font-medium text-foreground text-sm">
                        {section?.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <Icon 
                      name="ChevronDown" 
                      size={14} 
                      className={`transition-transform ${
                        expandedSections?.includes(section?.id) ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Section Items */}
                {(!isCollapsed && expandedSections?.includes(section?.id)) && (
                  <div className="mt-2 space-y-1">
                    {section?.items?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className={`w-full flex items-center space-x-3 p-2 pl-8 rounded-lg luxury-micro-transition ${
                          isActivePath(item?.path)
                            ? 'bg-accent/10 text-accent border-l-2 border-accent' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} />
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">{item?.label}</p>
                          <p className="text-xs opacity-75">{item?.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Collapsed State Tooltip Items */}
                {isCollapsed && (
                  <div className="relative group">
                    <div className="absolute left-full top-0 ml-2 w-48 bg-popover border border-border rounded-lg luxury-shadow-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        <p className="font-medium text-foreground text-sm mb-2">
                          {section?.label}
                        </p>
                        <div className="space-y-1">
                          {section?.items?.map((item) => (
                            <button
                              key={item?.path}
                              onClick={() => handleNavigation(item?.path)}
                              className={`w-full flex items-center space-x-2 p-2 rounded text-left luxury-micro-transition ${
                                isActivePath(item?.path)
                                  ? 'bg-accent/10 text-accent' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                              }`}
                            >
                              <Icon name={item?.icon} size={14} />
                              <div>
                                <p className="text-xs font-medium">{item?.label}</p>
                                <p className="text-xs opacity-75">{item?.description}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Shield" size={16} color="#0D0D0D" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-foreground">Admin Mode</p>
                <p className="text-xs text-muted-foreground">Full Access</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;