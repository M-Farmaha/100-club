import { List, Section, SectionWrap, TitleH2 } from "./AboutSection-styled";

import { AboutItem } from "./AboutItem";

export const AboutSection = () => {
  const aboutList = [
    {
      id: "about-1",
      icon: "#icon-serve",
      title: "Персональні та групові тренування",
      text: "Персональні тренування для будь-якого рівня навичок з досвідченим тренером або групові тренування залежно від вашого рівня.",
    },
    {
      id: "about-2",
      icon: "#icon-racket",
      title: "Найкраще обладнання",
      text: "Наш клуб завжди дбає про якість м'ячів, якими ми граємо, періодично оновлюємо корт та сітки, а також маємо послугу перетяжки струн досвідченими майстрами.",
    },
    {
      id: "about-3",
      icon: "#icon-award",
      title: "Турніри та нагороди",
      text: "Піднімай свій рівень гри на різноманітних любительських та професійних турнірах. Отримуй кубки та медалі, а також рейтинг щоб піднятись на вершину слави клубу 100.",
    },
    {
      id: "about-4",
      icon: "#icon-girl",
      title: "Широка спільнота",
      text: "Наш клуб приймає як початківців, так і професіоналів будь-якого віку. Тут ти зможеш знайти суперників, домовитись про персональні та групові спаринги і просто провести час весело та з користю.",
    },
  ];

  return (
    <>
      <Section>
        <SectionWrap>
          <TitleH2>Наш клуб пропонує:</TitleH2>
          <List>
            {aboutList.map((item, index) => (
              <AboutItem key={item.id} item={item} index={index} />
            ))}
          </List>
        </SectionWrap>
      </Section>
    </>
  );
};
