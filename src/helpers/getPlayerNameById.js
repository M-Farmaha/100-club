export const getPlayerNameById = (ids, members) => {
  if (ids.length === 1) {
    const member = members.find((member) => member.id === ids[0]);
    return member ? member.name : "Невідомий учасник";
  }

  const sortedMembers = ids
    .map((idItem) => {
      const member = members.find((member) => member.id === idItem);
      return member ? member : null;
    })
    .filter((member) => member !== null);

  const maleMembers = sortedMembers.filter((member) => member.sex === "male");
  const femaleMembers = sortedMembers.filter(
    (member) => member.sex === "female"
  );

  const finalMembers = [...maleMembers, ...femaleMembers];

  const names = finalMembers.map((member) => member.name);
  return names.join(" / ");
};
