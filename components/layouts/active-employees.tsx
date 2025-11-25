import { TUser } from "@/types/user-t";

export const ActiveEmployees = () => {
  const users: TUser[] = [];
  return (
    <aside className="bg-background text-foreground border border-[#e6e6e610] rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-2">Active Cashiers</h3>
      <div className="border-t pt-3 border-[#e6e6e610]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-foreground">Total</div>
          <div className="font-semibold">5</div>
        </div>
        <div className="space-y-2 mb-3 max-h-36 overflow-auto">
          {users.length === 0 ? (
            <div className="text-xs text-foreground">Cashiers is empty</div>
          ) : (
            users.map((user) => (
              <div key={user._id} className="flex items-center justify-between">
                <div className="text-sm truncate">{user.fullName}</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-14 text-right border rounded px-1"
                    value={user.company}
                  />
                  <div className="w-16 text-right">{user.email}</div>
                  <button className="text-xs text-rose-600">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
