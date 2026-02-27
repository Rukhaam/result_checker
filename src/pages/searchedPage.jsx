import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResult, clearResult } from '../store/resultSlice';
import { fetchExams } from '../store/examSlice';
import SideBar from '../components/sidebar.component';

const JkSearch = () => {
  const [examId, setExamId] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  
  // Custom Dropdown State & Ref
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const dispatch = useDispatch();
  const { scorecard, loading: resultLoading, error: resultError } = useSelector((state) => state.result);
  const { examList = [], loading: examsLoading, error: examsError } = useSelector((state) => state.exams);

  // Fetch exams on mount
  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set default exam selection
  useEffect(() => {
    if (examList.length > 0 && !examId) {
      setExamId(examList[0].id);
    }
  }, [examList, examId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (examId && rollNumber) {
      dispatch(fetchResult({ examId, rollNumber }));
    }
  };

  // Helper to get the currently selected exam for the display box
  const selectedExam = examList.find(exam => exam.id === examId);

  return (
    <div>
      <SideBar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Jammu & Kashmir Examination Results
          </h1>

          <form onSubmit={handleSearch} className="space-y-4 mb-8">
            
            {/* --- PRO WAY CUSTOM DROPDOWN --- */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-gray-700 mb-2 font-medium">Select Exam</label>
              
              {examsLoading ? (
                 <p className="text-gray-500 text-sm py-2">Loading exams...</p>
              ) : examsError ? (
                 <p className="text-red-500 text-sm py-2">{examsError}</p>
              ) : (
                <>
                  {/* Clickable Display Box */}
                  <div 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full border border-gray-300 bg-white p-3 rounded-md shadow-sm flex justify-between items-center cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <span className={`text-sm md:text-base truncate pr-4 ${!selectedExam ? 'text-gray-400' : 'text-gray-800'}`}>
                      {selectedExam ? `${selectedExam.title} (${selectedExam.institution_name})` : '-- Select an Exam --'}
                    </span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown Options List */}
                  {isOpen && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {examList.map((exam) => (
                        <li 
                          key={exam.id}
                          onClick={() => {
                            setExamId(exam.id);
                            setIsOpen(false);
                          }}
                          className={`p-3 text-sm md:text-base cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors
                            whitespace-normal break-words leading-snug
                            ${examId === exam.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          <span className="block font-medium">{exam.title}</span>
                          <span className="block text-xs md:text-sm text-gray-500 mt-0.5">{exam.institution_name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
            {/* ---------------------------------- */}
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Enter Roll Number</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2300155"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-4 pt-2">
              <button 
                type="submit" 
                disabled={resultLoading || examsLoading}
                className="bg-blue-600 text-white px-6 py-2.5 rounded hover:bg-blue-700 disabled:bg-blue-400 shadow transition font-medium"
              >
                {resultLoading ? 'Searching...' : 'Find Result'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setRollNumber('');
                  dispatch(clearResult());
                }}
                className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded hover:bg-gray-300 shadow-sm transition font-medium"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Display Result Error */}
          {resultError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 shadow-sm">
              {resultError}
            </div>
          )}

          {/* Display Scorecard */}
          {scorecard && (
            <div className="border border-green-200 rounded-lg overflow-hidden mt-6 shadow-md bg-white">
              <div className="bg-green-50 px-4 py-3 border-b border-green-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-green-800">Result Found</h3>
              </div>
              <div className="p-5 space-y-4 text-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><span className="text-gray-500 block text-xs uppercase tracking-wider">Student Name</span> <strong>{scorecard.student_name}</strong></p>
                  <p><span className="text-gray-500 block text-xs uppercase tracking-wider">Roll No</span> <strong>{scorecard.roll_number}</strong></p>
                  <p><span className="text-gray-500 block text-xs uppercase tracking-wider">Registration No</span> <strong>{scorecard.registration_number}</strong></p>
                  <p><span className="text-gray-500 block text-xs uppercase tracking-wider">Institution</span> <strong>{scorecard.institution_name}</strong></p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border border-gray-100 mt-2">
                  <span className="text-gray-500 block text-xs uppercase tracking-wider">Examination</span> 
                  <strong className="text-sm md:text-base">{scorecard.exam_title}</strong>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div>
                    <span className="block text-gray-500 text-sm uppercase tracking-wider">Total Marks</span>
                    <span className="text-2xl font-bold text-gray-900">{scorecard.marks_obtained} <span className="text-lg text-gray-400 font-normal">/ {scorecard.total_marks}</span></span>
                  </div>
                  <div>
                    <span className={`px-6 py-2 rounded-full font-bold text-white shadow-sm ${scorecard.status === 'Pass' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {scorecard.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JkSearch;