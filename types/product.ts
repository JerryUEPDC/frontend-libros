export type ProductType = {
  id: number;
  attributes: {
    productName: string;
    slug: string;
    Description: string;
    active: boolean;
    isFeatured: boolean;
    curso: string;
    materia: string;
    price: number;
    images: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      }[];
    };
    category: {
      data: {
        attributes: {
          slug: string;
          categoryName: string;
        };
      };
    };
  };
};
