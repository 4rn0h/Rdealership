// src/pages/user-dashboard/components/QuickActionCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { supabase } from "../../../lib/supabaseClient";
import { mockQuickActions } from "../../../data/Dashboard_Data";

const QuickActionCard = ({ onClick }) => {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchQuickActions = async () => {
      try {
        const { data, error } = await supabase
          .from("quick_actions")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Supabase quick_actions error → using mocks:", error.message);
          setActions(mockQuickActions);
        } else if (!data?.length) {
          console.warn("Supabase quick_actions empty → using mocks");
          setActions(mockQuickActions);
        } else {
          setActions(data);
        }
      } catch (err) {
        console.error("Quick actions fetch failed → using mocks:", err.message);
        setActions(mockQuickActions);
      }
    };

    fetchQuickActions();
  }, []);

  const handleClick = (action) => {
    if (onClick) onClick(action);
    else if (action?.path) navigate(action.path);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <div
          key={action.id || action.title}
          className="bg-card border border-border rounded-lg p-6 luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition group"
        >
          <div className="text-center">
            <div
              className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${action?.bgColor} group-hover:scale-110 luxury-transition`}
            >
              <Icon name={action?.icon} size={24} className={action?.color} />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">
              {action?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {action?.description}
            </p>
            <Button
              variant={action?.variant || "outline"}
              size="sm"
              onClick={() => handleClick(action)}
              iconName={action?.buttonIcon || action?.icon}
              iconPosition="left"
              className="w-full"
            >
              {action?.buttonText}
            </Button>
            {action?.badge && (
              <div className="mt-3">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${action?.badge?.bgColor} ${action?.badge?.color}`}
                >
                  {action?.badge?.icon && (
                    <Icon
                      name={action?.badge?.icon}
                      size={12}
                      className="mr-1"
                    />
                  )}
                  {action?.badge?.text}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActionCard;
