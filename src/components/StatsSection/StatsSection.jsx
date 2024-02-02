import { List, Section, SectionWrap } from "./StatsSection-styled";

import { StatItem } from "./StatsItem";

export const StatsSection = ({ membersArray }) => {
  const players = membersArray.length;
  const trainers = membersArray.filter((member) => member.type === "Тренер");
  const experience = new Date().getFullYear() - 2016;

  const stats = [
    { name: "Турнірів за рік", count: 45, icon: "icon-stats-1" },
    { name: "Гравців у клубі", count: players, icon: "icon-stats-2" },
    { name: "Років досвіду", count: experience, icon: "icon-stats-3" },
    { name: "Тренерів у клубі", count: trainers.length, icon: "icon-stats-4" },
  ];

  return (
    <>
      <Section>
        <SectionWrap>
          <List>
            {stats.map((stat) => (
              <StatItem
                key={stat.name}
                name={stat.name}
                count={stat.count}
                icon={stat.icon}
              />
            ))}
          </List>
        </SectionWrap>
      </Section>
    </>
  );
};
