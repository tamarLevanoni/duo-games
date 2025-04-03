import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { BorrowingForLocation } from "@/app/stores/types";

// טיפוס עבור בקשת השאלה
export type BorrowingCard = {
  borrowerName: string;
  gameName: string;
  date: Date;
  onApproveReturn?: () => void;
  onApprove?: () => void;
  onIgnore?: () => void;
  onExpand: () => void;
  sendMassage?: () => void;
  type: "pending" | "active" | "returned";
};

export default function BorrowingCard({
  borrowerName,
  gameName,
  date,
  onApprove,
  onIgnore,
  onExpand,
  type,
  sendMassage,
  onApproveReturn,
}: BorrowingCard) {
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
        {type == "pending" && (
          <div className="flex gap-2">
            <Button className="bg-green-600 text-white" onClick={onApprove}>
              אישור
            </Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-300"
              onClick={onIgnore}
            >
              לא רלוונטי
            </Button>
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
        <Button className="bg-yellow-300 shadow px-4" onClick={onExpand}>
          להרחבה&gt;&gt;
        </Button>
      </div>
    </Card>
  );
}
