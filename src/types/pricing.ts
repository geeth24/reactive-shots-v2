export enum Category {
  Portraits = 'portraits',
  Events = 'events',
  Cars = 'cars',
}

export type PackageDescription = {
  title: string;
};

export type PricingPackage = {
  title: string;
  description: PackageDescription[];
  price: string;
  bestValue?: boolean;
};

export type PricingData = {
  [key in Category]: PricingPackage[];
};

export type ImageMap = {
  [key in Category]: string[];
};

export type Categories = {
  category_name: string;
  album: {
    album_photos: Album[];
  };
};

export type Album = {
  image: string;
  file_metadata: {
    blur_data_url: string;
  };
};
