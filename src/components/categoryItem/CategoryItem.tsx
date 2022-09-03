export interface ICategoryItem {
  id: string;
  title: string;
  imageURL: string;
}

const CategoryItem = ({ title, id, imageURL }: ICategoryItem) => {
  return (
    <div id={id} className="category-container">
      <div
        className="category-background-image"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
