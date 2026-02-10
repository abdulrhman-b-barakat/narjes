type ProductImage = {
  url: string;
  altText: string;
};


interface SimilarProducts {
  _id: number;
  name: string;
  price: number;
  images: { url: string }[];
};

