import { render,screen,fireEvent } from '@testing-library/react';
import { describe,expect,it } from 'vitest';
import App from '../App';
describe('student workflows',()=>{
 it('opens Unit 2 and a lesson without exposing scores or login',()=>{location.hash='/';render(<App/>);fireEvent.click(screen.getByRole('button',{name:/explore active unit 2/i}));expect(screen.getByText(/Compound Structure/)).toBeInTheDocument();expect(screen.queryByText(/log in|score:/i)).not.toBeInTheDocument();fireEvent.click(screen.getAllByRole('button',{name:'Learn'})[0]);expect(screen.getByText('Learning objectives')).toBeInTheDocument()});
 it('opens the periodic table and exposes element details',()=>{location.hash='/';render(<App/>);fireEvent.click(screen.getAllByRole('button',{name:/periodic table/i}).at(-1)!);expect(screen.getByLabelText('Interactive periodic table')).toBeInTheDocument();fireEvent.click(screen.getByRole('button',{name:'Copper, atomic number 29, atomic mass 63.546'}));expect(screen.getByText('Atomic number 29')).toBeInTheDocument()});
 it('checks an alloy particle-structure model',()=>{location.hash='/practice/2.4';render(<App/>);fireEvent.click(screen.getByRole('radio',{name:/Pure metal/}));fireEvent.click(screen.getByRole('button',{name:'Check structure'}));expect(screen.getByText(/Correct. Only copper atoms/)).toBeInTheDocument()});
});
