export const getPlayerNameById = (id, members) => {
  if (Array.isArray(id)) {
    const sortedMembers = id
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
  }

  const member = members.find((member) => member.id === id);
  return member ? member.name : "Невідомий учасник";
};
