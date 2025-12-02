import { ReactNode } from "react";

export const MistTableHeader = ({
  label,
  bordered = true,
}: {
  label: string;
  bordered?: boolean;
}) => {
  return (
    <th
      className={`text-left py-2 px-1 ${
        bordered ? "border-r-2 border-[#e6e6e610]" : ""
      }`}
    >
      {label}
    </th>
  );
};

export const MistTableRow = ({
  label,
  bordered = true,
}: {
  label: string;
  bordered?: boolean;
}) => {
  return (
    <td
      className={`text-left py-2 px-1 ${
        bordered ? "border-r-2 border-[#e6e6e610]" : ""
      }`}
    >
      {label}
    </td>
  );
};

export const MistTableListHeaders = ({ headers }: { headers: string[] }) => {
  return (
    <thead className="text-foreground">
      <tr>
        {headers.map((header, index) => (
          <MistTableHeader
            key={index}
            label={header}
            bordered={index !== headers.length - 1}
          />
        ))}
      </tr>
    </thead>
  );
};
export const MistTableListRows = ({
  rows,
  key,
  action,
}: {
  rows: string[];
  key: any;
  action?: ReactNode;
}) => {
  return (
    <tr key={key} className="border-t text-foreground! border-[#e6e6e640]">
      {rows.map((row, index) =>
        index === rows.length - 1 && action ? (
          <td className={`text-left py-2 px-1`}>{action}</td>
        ) : (
          <MistTableRow
            key={index}
            label={row}
            bordered={index !== rows.length - 1}
          />
        )
      )}
    </tr>
  );
};

export const MistTable = ({ children }: { children: ReactNode }) => {
  return <table className="text-sm table-auto w-max ">{children}</table>;
};
