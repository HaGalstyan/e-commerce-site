import CategoryItem, { ICategoryItem } from "../categoryItem/CategoryItem";

interface IDirectory {
  categories: ICategoryItem[];
}

const Directory = ({ categories }: IDirectory) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        const { id, title, imageURL } = category;
        return (
          <CategoryItem title={title} id={id} key={id} imageURL={imageURL} />
        );
      })}
    </div>
  );
};

export default Directory;
