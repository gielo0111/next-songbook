import { TableCell, TableRow } from '@/components/ui/table';
import { SelectProduct } from '@/lib/db';
import React from 'react';

export function Product({ product, setShowSongModal, setSongDetails, setIsEdit }: { 
  product: SelectProduct, setShowSongModal:any, setSongDetails:any, setIsEdit: any}) {
  return (
    <TableRow>
      <TableCell className="font-medium"><button onClick={() => {
        setIsEdit(true);
        setShowSongModal(true);
        setSongDetails(product)
      }
      }>{product.title}</button></TableCell>
      <TableCell>
          {product.artist}
      </TableCell>
      <TableCell className="hidden md:table-cell">{`${product.lyrics}`}</TableCell>
    </TableRow>
  );
}
