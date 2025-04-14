import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  BorrowingForLocation,
  GLForLocation,
  ApproveBorrowRequest,
} from "@/app/stores/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JSX, useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BorrowingStatus, GameStatus } from "@prisma/client";
import PendingDialog from "./PendingDialog";
// טיפוס עבור בקשת השאלה
export type BorrowingCard = {
  borrowing: BorrowingForLocation;
  date: Date;
  // onApproveReturn?: () => void;
  // onApprove?: () => void;
  // onIgnore?: () => void;
  // sendMassage?: () => void;
  // type: "pending" | "active" | "returned";
  // handleUpdate: (data: any) => void;
  // games?: GLForLocation[];
  buttons: JSX.Element;
};

export default function BorrowingCard({
  borrowing,
  date,
  // onApprove,
  // onIgnore,
  // type,
  // sendMassage,
  // onApproveReturn,
  // handleUpdate,
  // games,
  buttons
}: BorrowingCard) {
  const borrowerName = borrowing.borrow.name;
  const gameName = borrowing.gls.map((gl) => gl.game?.name).join(", ");
  // const isAvaliable =
  //   type != "pending" ||
  //   borrowing.gls.every((gl) => gl.status == GameStatus.Available);
  // const BorrwingDetailsDialog = () => {
  //   const [status, setStatus] = useState(borrowing.status);
  //   const [rentalDate, setRentalDate] = useState(
  //     borrowing.rentalDate || undefined
  //   );
  //   const [expectedReturnDate, setExpectedReturnDate] = useState(
  //      borrowing.gls[0].expectedReturnDate || undefined
  //   );
  //   console.log("rentalDate", rentalDate, typeof rentalDate);
  //   const [returnDate, setReturnDate] = useState(
  //     borrowing.returnDate || undefined
  //   );
  //   const [selectedGames, setSelectedGames] = useState(
  //     borrowing.gls.map((gl) => gl.id)
  //   );
  //   const unAvaliable =
  //     type == "pending" &&
  //     selectedGames.some(
  //       (glId) =>
  //         games?.find((g) => g.id === glId)?.status !== GameStatus.Available
  //     );

  //   const handleSave = () => {
  //     const status = returnDate
  //       ? BorrowingStatus.Returned
  //       : rentalDate
  //       ? BorrowingStatus.Borrowed
  //       : BorrowingStatus.Requested;
  //     const data: ApproveBorrowRequest = {
  //       id: borrowing.id,
  //       status,
  //       rentalDate: rentalDate,
  //       returnDate: returnDate,
  //       gls: games
  //         ? games
  //             .filter((g) => selectedGames.includes(g.id))
  //             .map((g) => ({
  //               ...g,
  //               expectedReturnDate: expectedReturnDate,
  //               status:
  //                 status === BorrowingStatus.Borrowed
  //                   ? GameStatus.Borrowed
  //                   : GameStatus.Available,
  //             }))
  //         : [],
  //     };
  //     handleUpdate(data);
  //   };
  //   return (
  //     <Dialog>
  //       <DialogTrigger asChild>
  //         <Button variant="outline">
  //           <span className="text-sm text-gray-500">הרחבה</span>
  //         </Button>
  //       </DialogTrigger>
  //       <DialogContent className="sm:max-w-[425px]">
  //         <DialogHeader>
  //           <DialogTitle>פרטי ההשאלה</DialogTitle>
  //         </DialogHeader>

  //         <div className="space-y-3">
  //           <p>
  //             <strong>שם שואל:</strong> {borrowing.borrow.name}
  //           </p>
  //           <p>
  //             <strong>טלפון:</strong> {borrowing.borrow.phone}
  //           </p>
  //           {type != "pending" && (
  //             <p>
  //               <strong>משחקים:</strong> {gameName}
  //             </p>
  //           )}
  //           {/* 
  //           <label className="block text-sm font-medium">סטטוס</label>
  //           <Select defaultValue={status} onValueChange={(value) => setStatus(value as BorrowingStatus)}>
  //             <SelectTrigger className="w-[180px]">
  //               <SelectValue />
  //             </SelectTrigger>
  //             <SelectContent>
  //               {Object.values(BorrowingStatus).map((status) => (
  //                 <SelectItem key={status} value={status}>
  //                   {status}
  //                 </SelectItem>
  //               ))}
  //             </SelectContent>
  //           </Select> */}
  //           <label className="block text-sm font-medium">תאריך השאלה</label>
  //           <Input
  //             type="date"
  //             value={rentalDate ? rentalDate.toISOString().slice(0, 10) : ""}
  //             onChange={(e) => {
  //               console.log("rentalDate", e.target.value);
  //               setRentalDate(
  //                 e.target.value ? new Date(e.target.value) : undefined
  //               );
  //             }}
  //           />

  //           <label className="block text-sm font-medium">צפי החזרה</label>
  //           <Input
  //             type="date"
  //             value={
  //               expectedReturnDate
  //                 ? expectedReturnDate.toISOString().slice(0, 10)
  //                 : ""
  //             }
  //             onChange={(e) =>
  //               setExpectedReturnDate(
  //                 e.target.value ? new Date(e.target.value) : undefined
  //               )
  //             }
  //           />

  //           <label className="block text-sm font-medium">תאריך החזרה</label>
  //           <Input
  //             type="date"
  //             value={returnDate ? returnDate.toISOString().slice(0, 10) : ""}
  //             onChange={(e) =>
  //               setReturnDate(
  //                 e.target.value ? new Date(e.target.value) : undefined
  //               )
  //             }
  //           />

  //           {type == "pending" && games && (
  //             <>
  //               <label className="block text-sm font-medium">משחקים</label>

  //               <MultiSelect
  //                 options={games.map((g) => ({
  //                   label: g.game.name,
  //                   value: g.id,
  //                   unavailable: g.status != GameStatus.Available,
  //                 }))}
  //                 onValueChange={setSelectedGames}
  //                 defaultValue={selectedGames}
  //                 placeholder="משחקים"
  //                 variant="inverted"
  //                 // animation={2}
  //               />
  //             </>
  //           )}

  //           <Button
  //             onClick={handleSave}
  //             className="w-full bg-green-600 text-white mt-4"
  //             disabled={unAvaliable}
  //           >
  //             שמירה
  //           </Button>
  //         </div>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // };

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm text-gray-600">
        {/* <span className="text-green-600 font-bold">ת. השאלה</span> */}
        {borrowerName}
        <span>{format(new Date(date), "dd.MM.yy")}</span>
      </div>

      <div className="text-right text-lg font-semibold text-gray-800"></div>

      <div className="text-right text-md text-gray-700">{gameName}</div>

      <div className="flex justify-between items-center mt-4">
        {buttons}
        {/* {type == "pending" && (
          <div className="flex gap-2">
            <Button
              className="bg-green-600 text-white"
              onClick={onApprove}
              disabled={!isAvaliable}
            >
              אישור
            </Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-300"
              onClick={onIgnore}
            >
              לא רלוונטי
            </Button>
            <PendingDialog borrowing={borrowing} handleUpdate={handleUpdate} games={games||[]}/>
          </div>
        )}
        {type == "active" && (
          <div className="flex gap-2">
            <Button
              className="bg-green-600 text-white"
              onClick={onApproveReturn}
            >
              החזרה
            </Button>
            <Button className="bg-blue-600 text-white" onClick={sendMassage}>
              שליחת תזכורת
            </Button>
          </div>
        )}
        {type == "returned" && (
          <div className="text-green-600 font-bold">
            <Button className="bg-green-600 text-white" onClick={sendMassage}>
              שליחת משוב
            </Button>
          </div>
        )}
        <BorrwingDetailsDialog /> */}
      </div>
    </Card>
  );
}
