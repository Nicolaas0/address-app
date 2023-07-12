interface Props {
  color?: string;
  title: string;
  loading?: boolean;
  onClick?: () => void;
}

export default function MyButton({ color = 'blue-500', title, loading = false, onClick, ...rest }: Props) {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`bg-${loading ? 'gray-400' : color} text-white font-bold py-2 px-4 rounded`}
      onClick={handleClick}
      disabled={loading}
      {...rest}
    >
      {loading ? 'Loading...' : title}
    </button>
  );
}