import { useEffect, useState } from "react";
import { useManagerStore } from "@/app/stores/stores";
import BorrowingCard from "./BorrowingCard";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BorrowingForLocation } from "@/app/stores/types";
import { BorrowingStatus, GameStatus } from "@prisma/client";
import PendingDialog from "./PendingDialog";
import { Button } from "@/components/ui/button";

export default function BorrowingManagement() {
  const borrowings = useManagerStore((state) => state.borrowings);
  const games = useManagerStore((state) => state.gls);
  const pending = borrowings.filter((b) => b.status === "Requested");
  const active = borrowings.filter((b) => b.status === "Borrowed");
  const returned = borrowings.filter((b) => b.status === "Returned");

  const handleApprove = async (borrwing: BorrowingForLocation) => {
    try {
      const today = new Date();
      const data = {
        ...borrwing,
        gls:borrwing.gls.map((gl)=>({
          ...gl,
          status:GameStatus.Borrowed,
          expectedReturnDate:new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
        })),
        status: BorrowingStatus.Borrowed,
        rentalDate: today,
      };
      await useManagerStore.getState().updateBorrowing(data);
      console.log("אושר", data);
    } catch (error) {
      console.error("Failed to approve borrowing:", error);
    }
  };
  const handleReturn = async (borrwing: BorrowingForLocation) => {
    try {
      const data = {
        ...borrwing,
        gls: borrwing.gls.map((gl) => ({
          ...gl,
          status: GameStatus.Available,
          expectedReturnDate:null
        })),
        status: BorrowingStatus.Returned,
        returnDate: new Date(),
      };
      await useManagerStore.getState().updateBorrowing(data);
      console.log("אושר", data);
    } catch (error) {
      console.error("Failed to approve borrowing:", error);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      await useManagerStore.getState().updateBorrowing(data);
    } catch (error) {
      console.error("Failed to update borrowing:", error);
    }
  };
  const returnedButtons = (borrowing: BorrowingForLocation) => {
    return (
      <>
        <div className="text-green-600 font-bold">
          <Button
            className="bg-green-600 text-white"
            // onClick={sendMassage}
          >
            שליחת משוב
          </Button>
        </div>
      </>
    );
  };
  const activeButtons = (borrowing: BorrowingForLocation) => {
    return (
      <>
        <div className="flex gap-2">
          <Button
            className="bg-green-600 text-white"
            onClick={() => handleReturn(borrowing)}
          >
            החזרה
          </Button>
          <Button
            className="bg-blue-600 text-white"
            // onClick={sendMassage}
          >
            שליחת תזכורת
          </Button>
        </div>
      </>
    );
  };
  const pendingButtons = (borrowing: BorrowingForLocation) => {
    const isAvaliable = borrowing.gls.every(
      (gl) => gl.status == GameStatus.Available
    );
    return (
      <>
        <div className="flex gap-2">
          <Button
            className="bg-green-600 text-white"
            onClick={() => handleApprove(borrowing)}
            disabled={!isAvaliable}
          >
            אישור
          </Button>
          <Button
            variant="outline"
            className="text-red-600 border-red-300"
            // onClick={onIgnore}
          >
            לא רלוונטי
          </Button>
          <PendingDialog
            borrowing={borrowing}
            handleUpdate={handleUpdate}
            games={games || []}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="flex flex-row-reverse gap-2 mb-4 bg-muted p-1 rounded-xl">
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-white data-[state=active]:shadow px-4 py-2 rounded-md"
          >
            בקשות
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-white data-[state=active]:shadow px-4 py-2 rounded-md"
          >
            שאלות פעילות
          </TabsTrigger>
          <TabsTrigger
            value="returned"
            className="data-[state=active]:bg-white data-[state=active]:shadow px-4 py-2 rounded-md"
          >
            החזרות
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="pending"
          dir="rtl"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {pending.length > 0 ? (
            pending.map((req) => (
              <BorrowingCard
                key={req.id}
                // onApprove={()=>handleApprove(req)}
                // onIgnore={() => console.log("לא רלוונטי", req.id)}
                // type="pending"
                borrowing={req}
                // handleUpdate={handleUpdate}
                // games={games}
                date={req.createdAt}
                buttons={pendingButtons(req)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">אין בקשות ממתינות</p>
          )}
        </TabsContent>

        <TabsContent value="active" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {active.length > 0 ? (
              active.map((b) => (
                <BorrowingCard
                  key={b.id}
                  date={b.rentalDate!}
                  // onApproveReturn={() => handleReturn(b)}
                  // sendMassage={() => console.log("שליחת תזכורת", b.id)}
                  // type="active"
                  borrowing={b}
                  // handleUpdate={handleUpdate}
                  buttons={activeButtons(b)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 col-span-full">
                אין שאלות פעילות
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="returned" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {returned.length > 0 ? (
              returned.map((b) => (
                <BorrowingCard
                  key={b.id}
                  date={b.returnDate!}
                  // sendMassage={() => console.log("שליחת משוב", b.id)}
                  // type="returned"
                  borrowing={b}
                  // handleUpdate={handleUpdate}
                  buttons={returnedButtons(b)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 col-span-full">
                אין השאלות שהוחזרו
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
