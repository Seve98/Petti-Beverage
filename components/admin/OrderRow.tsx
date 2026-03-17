"use client";

interface OrderRowProps {
  order: any;
  onStatusChange: (id: string, status: string) => void;
}

export function OrderRow({ order, onStatusChange }: OrderRowProps) {
  return (
    <div className="border border-gold/10 bg-[#0a0a0a] p-6 mb-4 hover:border-gold/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 rounded-2xl shadow-lg">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-[10px] font-mono text-gold/50 uppercase tracking-tighter">
            {new Date(order.created_at).toLocaleDateString("it-IT", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span
            className={`text-[8px] font-bold px-2 py-0.5 border uppercase tracking-widest ${
              order.status === "PAID"
                ? "text-gold border-gold/20"
                : "text-green-400 border-green-400/20"
            }`}
          >
            {order.status}
          </span>
        </div>

        <h3 className="text-lg font-black italic text-white uppercase tracking-tight">
          {order.customer_name}
        </h3>
        <p className="text-xs text-white/40 mb-4">{order.customer_email}</p>

        <div className="flex flex-wrap gap-2">
          {order.items?.map((item: any, i: number) => (
            <span
              key={i}
              className="text-[9px] bg-black px-2 py-1 border border-white/5 text-gold-light/70 uppercase font-bold"
            >
              {item.quantity}x {item.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 min-w-[200px] w-full md:w-auto">
        <p className="text-2xl font-black italic text-white tracking-tighter">
          €
          {order.total_amount.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
          })}
        </p>

        <div className="w-full">
          <label className="text-[8px] uppercase text-gray-500 tracking-widest mb-1 block ml-1">
            Modifica Stato
          </label>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className="bg-black border border-gold/20 text-white text-[10px] uppercase tracking-widest p-3 rounded-xl w-full focus:border-gold outline-none cursor-pointer"
          >
            <option value="PAID">Pagato</option>
            <option value="SHIPPED">Spedito</option>
            <option value="DELIVERED">Consegnato</option>
            <option value="CANCELLED">Annullato</option>
          </select>
        </div>
      </div>
    </div>
  );
}
