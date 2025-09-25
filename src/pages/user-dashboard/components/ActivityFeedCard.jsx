// src/pages/user-dashboard/components/ActivityFeedCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import { mockActivities } from "../../../data/Dashboard_Data";

const ActivityFeedCard = ({ activity }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select(
            `
              id,
              type,
              details,
              created_at,
              vehicle:vehicles (
                id,
                make,
                model,
                year,
                image_urls
              )
            `
          )
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) {
          console.error("Supabase activities failed, using mocks:", error.message);
          setActivities(mockActivities);
        } else {
          setActivities(data?.length ? data : mockActivities);
        }
      } catch (err) {
        console.error("Activities fetch error:", err);
        setActivities(mockActivities);
      }
    };

    fetchActivities();
  }, []);

  if (!activity && !activities.length) {
    return (
      <div className="p-6 text-center">
        <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No recent activity</p>
      </div>
    );
  }

  const getActivityConfig = (type) => {
    const configs = {
      vehicle_viewed: { icon: "Eye", color: "text-accent", title: "Viewed Vehicle" },
      vehicle_favorited: { icon: "Heart", color: "text-error", title: "Added to Favorites" },
      inquiry_sent: { icon: "MessageSquare", color: "text-success", title: "Inquiry Sent" },
      test_drive_scheduled: { icon: "Calendar", color: "text-warning", title: "Test Drive Scheduled" },
    };
    return configs[type] || configs.vehicle_viewed;
  };

  const renderActivity = (a) => {
    const config = getActivityConfig(a.type);
    const vehicle = a.vehicle;

    return (
      <div
        key={a.id}
        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
        onClick={() => vehicle?.id && navigate(`/vehicle-detail?id=${vehicle.id}`)}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.color}`}>
          <Icon name={config.icon} size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            <span className="font-medium">{config.title}</span>
            {vehicle && (
              <>
                {" • "}
                <span className="font-medium">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </span>
              </>
            )}
          </p>
          <span className="text-xs text-muted-foreground">
            {new Date(a.created_at).toLocaleString()}
          </span>
        </div>
        {vehicle?.image_urls?.[0] && (
          <div className="w-8 h-8 rounded overflow-hidden">
            <Image
              src={vehicle.image_urls[0]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    );
  };

  return <div>{activity ? renderActivity(activity) : activities.map(renderActivity)}</div>;
};

export default ActivityFeedCard;
