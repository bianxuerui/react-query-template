import { useGetList } from './hooks/api';

function App() {
  const { data: user, isLoading } = useGetList({
    page: 1,
    pageSize: 5
  });


  if (isLoading) {
    return (
      <>加载中...</>
    );
  }
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  );
}

export default App;
