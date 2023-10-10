const changePokemonBackgroundColor = (type) => {
  let color = "#FFFFFF";
  switch (type) {
    case "fire":
      color = "#EE8130";
      break;
    case "water":
      color = "#6390F0";
      break;
    case "electric":
      color = "#F7D02C";
      break;
    case "grass":
      color = "#7AC74C";
      break;
    case "ice":
      color = "#96D9D6";
      break;
    case "fighting":
      color = "#C22E28";
      break;
    case "poison":
      color = "#A33EA1";
      break;
    case "ground":
      color = "#E2BF65";
      break;
    case "flying":
      color = "#A98FF3";
      break;
    case "psychic":
      color = "#F95587";
      break;
    case "bug":
      color = "#A6B91A";
      break;
    case "rock":
      color = "#B6A136";
      break;
    case "ghost":
      color = "#735797";
      break;
    case "dragon":
      color = "#6F35FC";
      break;
    case "dark":
      color = "#705746";
      break;
    case "steel":
      color = "#B7B7CE";
      break;
    case "fairy":
      color = "#D685AD";
      break;
    default:
      color = "#A8A878";
  }
  return color;
};

export default changePokemonBackgroundColor;
