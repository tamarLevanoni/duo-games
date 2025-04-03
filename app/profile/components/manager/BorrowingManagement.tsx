import { useEffect } from "react";
import {useManagerStore} from "@/app/stores/stores";
import BorrowingCard from "./BorrowingCard";
import { format } from "date-fns";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BorrowingForLocation } from "@/app/stores/types";
import { BorrowingStatus } from "@prisma/client";

export default function BorrowingManagement() {
  const borrowings = useManagerStore((state) => state.borrowings);

  const pending = borrowings.filter((b) => b.status === "Requested");
  const active = borrowings.filter((b) => b.status === "Borrowed");
  const returned = borrowings.filter((b) => b.status === "Returned");

  const handleApprove =async (borrwing:BorrowingForLocation) => {
    try {
      const data={
        ...borrwing,
        status: BorrowingStatus.Borrowed,
        rentalDate: new Date(),
      }
    await useManagerStore.getState().updateBorrowing(data);
    console.log("אושר", data);
    } catch (error) {
      console.error("Failed to approve borrowing:", error);
    }
  }
  const handleReturn =async (borrwing:BorrowingForLocation) => {
    try {
      const data={
        ...borrwing,
        status: BorrowingStatus.Returned,
        returnDate: new Date(),
      }
    await useManagerStore.getState().updateBorrowing(data);
    console.log("אושר", data);
    } catch (error) {
      console.error("Failed to approve borrowing:", error);
    }
  }

  return (
    <Tabs defaultValue="pending" className="w-full">
     <TabsList className="flex flex-row-reverse gap-2 mb-4 bg-muted p-1 rounded-xl">
        <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:shadow px-4 py-2 rounded-md">
          בקשות
        </TabsTrigger>
        <TabsTrigger value="active" className="data-[state=active]:bg-white data-[state=active]:shadow px-4 py-2 rounded-md">
          שאלות פעילות
        </TabsTrigger>
        <TabsTrigger value="returned" className="data-[state=active]:bg-white data-[state=active]:shadow px-4 py-2 rounded-md">
          החזרות
        </TabsTrigger>
      </TabsList>

    <TabsContent value="pending" dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {pending.length > 0 ? (
        pending.map((req) => (
          <BorrowingCard
            key={req.id}
            borrowerName={req.borrow.name}
            gameName={req.gls.map((gl) => gl.game?.name).join(", ")}
            date={req.createdAt}
            onApprove={()=>handleApprove(req)}
            onIgnore={() => console.log("לא רלוונטי", req.id)}
            onExpand={() => console.log("להרחבה", req.id)}
            type="pending"
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
                borrowerName={b.borrow.name}
                gameName={b.gls.map((gl) => gl.game?.name).join(", ")}
                date={b.rentalDate!}
                onApproveReturn={() => handleReturn(b)}
                sendMassage={() => console.log("שליחת תזכורת", b.id)}
                onExpand={() => console.log("להרחבה", b.id)}
                type="active"
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-full">אין שאלות פעילות</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="returned" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {returned.length > 0 ? (
            returned.map((b) => (
              <BorrowingCard
                key={b.id}
                borrowerName={b.borrow.name}
                gameName={b.gls.map((gl) => gl.game?.name).join(", ")}
                date={b.returnDate!}
                sendMassage={() => console.log("שליחת משוב", b.id)}
                onExpand={() => console.log("להרחבה", b.id)}
                type="returned"
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-full">אין השאלות שהוחזרו</p>
          )}
        </div>
      </TabsContent>
  </Tabs>
  );
}
