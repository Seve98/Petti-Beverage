"use client";

interface OrderRowProps {
  order: any;
  onStatusChange: (id: string, status: string) => void;
}

export function OrderRow({ order, onStatusChange }: OrderRowProps) {
  return (
    <div className="border border-gold/10 bg-clay p-6 mb-4 hover:border-gold/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-[10px] font-mono text-gold/50 uppercase tracking-tighter">
            {new Date(order.created_at).toLocaleDateString("it-IT")}
          </span>
          <span
            className={`text-[8px] font-bold px-2 py-0.5 border border-gold/20 uppercase tracking-widest ${
              order.status === "PAID" ? "text-gold" : "text-white/40"
            }`}
          >
            {order.status}
          </span>
        </div>
        <h3 className="text-lg font-black italic gold-gradient uppercase tracking-tight">
          {order.customer_name}
        </h3>
        <p className="text-xs text-white/40 mb-4">{order.customer_email}</p>

        <div className="flex flex-wrap gap-2">
          {order.items?.map((item: any, i: number) => (
            <span
              key={i}
              className="text-[9px] bg-black px-2 py-1 border border-white/5 text-gold-light/70 uppercase"
            >
              {item.quantity}x {item.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 min-w-[150px]">
        <p className="text-2xl font-black italic text-white tracking-tighter">
          €{order.total_amount}
        </p>
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value)}
          className="select-petti text-[10px] w-full"
        >
          <option value="PAID">Pagato</option>
          <option value="SHIPPED">Spedito</option>
          <option value="DELIVERED">Consegnato</option>
        </select>
      </div>
    </div>
  );
}
