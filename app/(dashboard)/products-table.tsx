'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from './product';
import { SelectProduct } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from "react";
import { Button } from '@/components/ui/button';
import SongModal from '@/components/ui/SongModal';

export function ProductsTable({
  products,
  offset,
  totalProducts
}: {
  products: SelectProduct[];
  offset: number;
  totalProducts: number;
}) {
  let router = useRouter();
  let productsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  const [showSongModal, setShowSongModal] = useState(false);
  const [songDetails, setSongDetails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Songs</CardTitle>
        <CardDescription>
          Manage your songlist and view their artist and lyrics.
          <br/><Button size="sm" className="h-8 gap-1" onClick={() => 
          {
        setIsEdit(false);
        setShowSongModal(true);
        setSongDetails([]);
        }
        }>
              Add Song
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead className="hidden md:table-cell">Lyrics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Product key={product._id} setShowSongModal={setShowSongModal} setIsEdit={setIsEdit} setSongDetails={setSongDetails} product={product} />
            ))}
          </TableBody>
        </Table>
        <SongModal isVisible={showSongModal} isEdit={isEdit} songDetails={songDetails} setIsRefresh={setIsRefresh} onClose={() => {
          if(isRefresh){
            window.location.reload();
           }
           setShowSongModal(false);
        }}></SongModal>
      </CardContent>
    </Card>
  );
}
