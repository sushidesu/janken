import clsx from "clsx";

export type Props = {
  hand: "rock" | "paper" | "scissors";
  onClick: () => void;
};

export function JankenButton({ hand, onClick }: Props): JSX.Element {
  const label = () => {
    switch (hand) {
      case "rock":
        return "グー";
      case "paper":
        return "パー";
      case "scissors":
        return "チョキ";
    }
  };
  return (
    <button
      onClick={onClick}
      className={clsx("px-4", "py-1.5", "bg-blue-300", "rounded-sm")}
    >
      {label()}
    </button>
  );
}
