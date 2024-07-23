import {useState} from 'react';
import { Habit } from './Habit';
import HabitCard from './HabitCard';
import { Button } from './ui/button';

interface GalleryProps {
    habits: Habit[];
}

const HabitsPerPage = 9;
export default function  HabitGallery ({ habits }:GalleryProps){
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * HabitsPerPage;
    const endIndex = startIndex + HabitsPerPage;
    const paginatedHabits = habits.slice(startIndex, endIndex);

    const rows: Habit[][] = [];
    let currentRow: Habit[] = [];

    paginatedHabits.forEach((habit, index) => {
        currentRow.push(habit);
        if ((index + 1) % 3 === 0 || index === paginatedHabits.length - 1) {
            rows.push([...currentRow]);
            currentRow = [];
        }
    });

    const totalPages = Math.ceil(habits.length / HabitsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedHabits.map((habit, index) => (
                    <div key={index} className="w-full">
                        <HabitCard habit={habit} />
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <Button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                    >
                        Previous
                    </Button>
                    <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-2"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

