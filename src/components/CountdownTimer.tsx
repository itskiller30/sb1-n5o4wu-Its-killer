import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex gap-4">
      {timeUnits.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="bg-holiday-pine/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-holiday-gold/10">
            <span className="text-2xl font-bold text-holiday-snow">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="text-xs text-holiday-silver mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;