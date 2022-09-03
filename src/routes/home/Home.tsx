import { ICategoryItem } from "../../components/categoryItem/CategoryItem";
import Directory from "../../components/directory/Directory";
import { Outlet } from "react-router-dom";

function Home() {
  const categories: ICategoryItem[] = [
    {
      id: "1",
      title: "hats",
      imageURL: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: "2",
      title: "jackets",
      imageURL: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: "3",
      title: "sneakers",
      imageURL: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: "4",
      title: "womens",
      imageURL: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: "5",
      title: "mens",
      imageURL: "https://i.ibb.co/R70vBrQ/mens.png",
    },
  ];

  return (
    <div>
      <Directory categories={categories} />;
      <Outlet />
    </div>
  );
}

export default Home;
