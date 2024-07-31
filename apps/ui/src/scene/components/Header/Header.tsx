import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Headr.scss';
// import classes from './Header.module.css';
import { AnchorButton, Button } from '../Button/Button';
import { useAuth } from '../Authenticator/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../../../services/auth';
export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const mutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      logout();
    },
  });
  return (
    <div className={`sm:container mx-auto container`}>
      <Link to="/">
        <h1 className={`h1 mr-3`}>icustomer test</h1>
        <i>Benchmark, Learn, Enhance</i>
      </Link>
      {!isAuthenticated ? (
        <AnchorButton variant="dark" href="/login">
          <span className="hidden sm:inline">Login</span>
        </AnchorButton>
      ) : (
        <Button onClick={mutation.mutate} variant="dark">
          <span className="hidden sm:inline">Logout</span>
        </Button>
      )}
    </div>
  );
}
