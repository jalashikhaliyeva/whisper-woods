// types/collection.ts
export interface CollectionItem {
    id: string;
    imageSrc: string;
    altText: string;
    title: string;
    location: string;
    category: string;
    order: number;
    createdAt: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
  }
  
  export interface CollectionCategory {
    id: string;
    name: string;
    slug: string;
    order: number;
    isActive: boolean;
    createdAt: string;
  }
  
  export interface CollectionItemCardProps {
    item: CollectionItem;
  }
  
  export interface CollectionItemsProps {
    selectedCategory: string;
  }
  
  export interface HeadingProps {
    categories: CollectionCategory[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
  }