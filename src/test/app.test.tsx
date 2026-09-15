import { render,screen,fireEvent } from '@testing-library/react';
import { describe,expect,it } from 'vitest';
import App from '../App';
describe('student workflows',()=>{
 it('opens Unit 2 and a lesson without exposing scores or login',()=>{location.hash='/';render(<App/>);fireEvent.click(screen.getByRole('button',{name:/explore active unit 2/i}));expect(screen.getByText(/Compound Structure/)).toBeInTheDocument();expect(screen.queryByText(/log in|score:/i)).not.toBeInTheDocument();fireEvent.click(screen.getAllByRole('button',{name:'Learn'})[0]);expect(screen.getByText('Learning objectives')).toBeInTheDocument()});
});
