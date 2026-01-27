import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubActivityProps {
  username: string;
}

// Generate mock data for fallback
function generateMockData(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 365);

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Random contribution pattern
    const random = Math.random();
    let count = 0;
    let level = 0;

    if (random > 0.3) {
      count = Math.floor(Math.random() * 12) + 1;
      if (count <= 3) level = 1;
      else if (count <= 6) level = 2;
      else if (count <= 9) level = 3;
      else level = 4;
    }

    days.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return days;
}

// Group contributions by week
function groupByWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  // Pad start with empty days to align to Sunday
  if (days.length > 0) {
    const firstDay = new Date(days[0].date).getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: "", count: 0, level: -1 });
    }
  }

  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Push remaining days
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

// Get month labels
function getMonthLabels(weeks: ContributionDay[][]): { month: string; index: number }[] {
  const labels: { month: string; index: number }[] = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const validDay = week.find((d) => d.date);
    if (validDay) {
      const month = new Date(validDay.date).getMonth();
      if (month !== lastMonth) {
        labels.push({ month: months[month], index });
        lastMonth = month;
      }
    }
  });

  return labels;
}

export function GitHubActivity({ username }: GitHubActivityProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchContributions() {
      try {
        // Try to fetch from GitHub's contribution calendar
        // Since GitHub's GraphQL API requires auth, we'll use a public proxy or fallback to mock
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );

        if (response.ok) {
          const data = await response.json();
          const days: ContributionDay[] = [];
          let total = 0;

          if (data.contributions) {
            data.contributions.forEach((day: { date: string; count: number; level: number }) => {
              days.push({
                date: day.date,
                count: day.count,
                level: day.level,
              });
              total += day.count;
            });
          }

          if (days.length > 0) {
            setContributions(days);
            setTotalContributions(total);
          } else {
            throw new Error("No data");
          }
        } else {
          throw new Error("API failed");
        }
      } catch {
        // Fallback to mock data
        const mockData = generateMockData();
        setContributions(mockData);
        setTotalContributions(mockData.reduce((sum, d) => sum + d.count, 0));
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, [username]);

  const weeks = groupByWeeks(contributions);
  const monthLabels = getMonthLabels(weeks);

  const levelColors = [
    "bg-muted",
    "bg-gray-300 dark:bg-gray-700",
    "bg-gray-400 dark:bg-gray-500",
    "bg-gray-500 dark:bg-gray-400",
    "bg-gray-700 dark:bg-gray-200",
  ];

  if (loading) {
    return (
      <div className="px-6 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-24 mb-4" />
          <div className="h-20 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      {/* Month labels */}
      <div className="overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="flex text-xs text-muted-foreground mb-2 ml-0">
            {monthLabels.map(({ month, index }) => (
              <span
                key={`${month}-${index}`}
                className="flex-none"
                style={{
                  marginLeft: index === 0 ? 0 : `${(index - (monthLabels[monthLabels.indexOf({ month, index }) - 1]?.index ?? 0)) * 13 - 24}px`,
                  width: "48px",
                }}
              >
                {month}
              </span>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`size-[10px] rounded-[2px] contribution-cell ${
                      day.level === -1 ? "bg-transparent" : levelColors[day.level]
                    }`}
                    style={{
                      "--delay": `${(weekIndex * 7 + dayIndex) * 2}ms`,
                    } as React.CSSProperties}
                    title={day.date ? `${day.count} contributions on ${day.date}` : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <span>{totalContributions.toLocaleString()} activities in {year}</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {levelColors.map((color, i) => (
            <div
              key={i}
              className={`size-[10px] rounded-[2px] ${color}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
