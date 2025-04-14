import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { BorrowingStatus, GameStatus } from "@prisma/client";

export type PendingDialogProps = {
  borrowing: BorrowingForLocation;
  handleUpdate: (data: any) => void;
  games: GLForLocation[];
};


export default function PendingDialog({ borrowing, handleUpdate, games }: PendingDialogProps) {
  const [rentalDate, setRentalDate] = useState<Date>();
  const [expectedReturnDate, setExpectedReturnDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [selectedGames, setSelectedGames] = useState(
    borrowing.gls.map((gl) => gl.id)
  );
  const unAvaliable = selectedGames.some(
    (glId) => games?.find((g) => g.id === glId)?.status !== GameStatus.Available
  );

  const handleSave = () => {
    const status = returnDate
      ? BorrowingStatus.Returned
      : rentalDate
      ? BorrowingStatus.Borrowed
      : BorrowingStatus.Requested;
    const data: ApproveBorrowRequest = {
      id: borrowing.id,
      status,
      rentalDate: rentalDate,
      returnDate: returnDate,
      gls: games
        ? games
            .filter((g) => selectedGames.includes(g.id))
            .map((g) => ({
              ...g,
              expectedReturnDate: expectedReturnDate,
              status:
                status === BorrowingStatus.Borrowed
                  ? GameStatus.Borrowed
                  : GameStatus.Available,
            }))
        : [],
    };
    handleUpdate(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="text-sm text-gray-500">הרחבה</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>פרטי ההשאלה</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p>
            <strong>שם שואל:</strong> {borrowing.borrow.name}
          </p>
          <p>
            <strong>טלפון:</strong> {borrowing.borrow.phone}
          </p>
          <label className="block text-sm font-medium">תאריך השאלה</label>
          <Input
            type="date"
            value={rentalDate ? rentalDate.toISOString().slice(0, 10) : ""}
            onChange={(e) => {
              console.log("rentalDate", e.target.value);
              setRentalDate(
                e.target.value ? new Date(e.target.value) : undefined
              );
            }}
          />

          <label className="block text-sm font-medium">צפי החזרה</label>
          <Input
            type="date"
            value={
              expectedReturnDate
                ? expectedReturnDate.toISOString().slice(0, 10)
                : ""
            }
            onChange={(e) =>
              setExpectedReturnDate(
                e.target.value ? new Date(e.target.value) : undefined
              )
            }
          />

          <label className="block text-sm font-medium">תאריך החזרה</label>
          <Input
            type="date"
            value={returnDate ? returnDate.toISOString().slice(0, 10) : ""}
            onChange={(e) =>
              setReturnDate(
                e.target.value ? new Date(e.target.value) : undefined
              )
            }
          />

              <label className="block text-sm font-medium">משחקים</label>

              <MultiSelect
                options={games.map((g) => ({
                  label: g.game.name,
                  value: g.id,
                  unavailable: g.status != GameStatus.Available,
                }))}
                onValueChange={setSelectedGames}
                defaultValue={selectedGames}
                placeholder="משחקים"
                variant="inverted"
                // animation={2}
              />


          <Button
            onClick={handleSave}
            className="w-full bg-green-600 text-white mt-4"
            disabled={unAvaliable}
          >
            שמירה
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};