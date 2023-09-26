/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

/* Components */
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

import Dashboard from '../Views/Dashboard'
import Login from '../Views/auth/login'
import LoginWithOtp from '../Views/auth/LoginWithOtp'
import ForgotPassword from '../Views/auth/ForgotPassword'
import ResetPassword from '../Views/auth/ResetPassword'
import OneTimePassword from '../Views/auth/OneTimePassword'
import SignUp from '../Views/auth/SignUp'
import EducationDetails from '../Components/Signup/CounsellorEducationDetails'
import KYCDetails from '../Components/Signup/CounsellorKYCDetails'

import QualificationMangement from '../Views/admin/QualificationManagement'
import AddNewQualification from '../Views/admin/QualificationManagement/AddNewQualification'
import EditQualification from '../Views/admin/QualificationManagement/EditQualification'
import ViewQualification from '../Views/admin/QualificationManagement/ViewQualification'

/* Package Mangement */
import PackageManagement from '../Views/admin/PackageManagement'
import AddNewPackage from '../Views/admin/PackageManagement/AddNewPackage'
import EditPackage from '../Views/admin/PackageManagement/EditPackage'
import ViewPackage from '../Views/admin/PackageManagement/ViewPackage'

/* University Mangement */
import UniversityManagement from '../Views/admin/UniversityManagement'
import AddNewUniversity from '../Views/admin/UniversityManagement/AddNewUniversity'
import EditUniversity from '../Views/admin/UniversityManagement/EditUniversity'
import ViewUniversity from '../Views/admin/UniversityManagement/ViewUniversity'

/* State Management */
import StateManagement from '../Views/admin/StateManagement'
import AddNewState from '../Views/admin/StateManagement/AddNewState'
import EditState from '../Views/admin/StateManagement/EditState'
import ViewState from '../Views/admin/StateManagement/ViewState'

/* University Management */
import CityManagement from '../Views/admin/CityManagement'
import AddNewCity from '../Views/admin/CityManagement/AddNewCity'
import EditCity from '../Views/admin/CityManagement/EditCity'
import ViewCity from '../Views/admin/CityManagement/ViewCity'

/* Grade Mangement */
import GradeManagement from '../Views/admin/GradeManagement'
import AddNewGrade from '../Views/admin/GradeManagement/AddNewGrade'
import EditGrade from '../Views/admin/GradeManagement/EditGrade'
import ViewGrade from '../Views/admin/GradeManagement/ViewGrade'

/* Board Mangement */
import BoardManagement from '../Views/admin/BoardManagement'
import AddNewBoard from '../Views/admin/BoardManagement/AddNewBoard'
import EditBoard from '../Views/admin/BoardManagement/EditBoard'
import ViewBoard from '../Views/admin/BoardManagement/ViewBoard'

/* School Mangement */
import SchoolManagement from '../Views/admin/SchoolManagement'
import AddNewSchool from '../Views/admin/SchoolManagement/AddNewSchool'
import EditSchool from '../Views/admin/SchoolManagement/EditSchool'
import ViewSchool from '../Views/admin/SchoolManagement/ViewSchool'

/* Test Management */
import Questions from '../Views/admin/TestManagement/Questions'
import AddNewQuestions from '../Views/admin/TestManagement/Questions/AddNewQuestions'
import EditQuestions from '../Views/admin/TestManagement/Questions/EditQuestions'
import ViewQuestions from '../Views/admin/TestManagement/Questions/ViewQuestions'
import MainCategory from '../Views/admin/TestManagement/MainCategory'
import AddNewMainCategory from '../Views/admin/TestManagement/MainCategory/AddNewMainCategory'
import ViewMainCategory from '../Views/admin/TestManagement/MainCategory/ViewMainCategory'
import EditMainCategory from '../Views/admin/TestManagement/MainCategory/EditMainCategory'
import SubCategory from '../Views/admin/TestManagement/SubCategory'
import AddNewSubCategory from '../Views/admin/TestManagement/SubCategory/AddNewSubCategory'
import ViewSubCategory from '../Views/admin/TestManagement/SubCategory/ViewSubCategory'
import EditSubCategory from '../Views/admin/TestManagement/SubCategory/EditSubCategory'
/* Norms Management */
import NormsManagement from '../Views/admin/NormsManagement'
import AddNewNorms from '../Views/admin/NormsManagement/AddNewNorms'
import ViewNorms from '../Views/admin/NormsManagement/ViewNorms'
import EditNorms from '../Views/admin/NormsManagement/EditNorms'
import GradeNorms from '../Views/admin/NormsManagement/GradeNorms'
import AddNewGradeNorms from '../Views/admin/NormsManagement/GradeNorms/AddNewGradeNorms'
import ViewGradeNorms from '../Views/admin/NormsManagement/GradeNorms/ViewGradeNorms'
import EditGradeNorms from '../Views/admin/NormsManagement/GradeNorms/EditGradeNorms'
import TestTimeNorms from '../Views/admin/NormsManagement/TestTimeNorms'
import AddNewTestTimeNorms from '../Views/admin/NormsManagement/TestTimeNorms/AddNewTestTimeNorms'
import ViewTestTimeNorms from '../Views/admin/NormsManagement/TestTimeNorms/ViewTestTimeNorms'
import EditTestTimeNorms from '../Views/admin/NormsManagement/TestTimeNorms/EditTestTimeNorms'
import TestDescriptionNorms from '../Views/admin/NormsManagement/TestDescriptionNorms'
import AddNewTestDescriptionNorms from '../Views/admin/NormsManagement/TestDescriptionNorms/AddNewTestDescriptionNorms'
import ViewTestDescriptionNorms from '../Views/admin/NormsManagement/TestDescriptionNorms/ViewTestDescriptionNorms'
import EditTestDescriptionNorms from '../Views/admin/NormsManagement/TestDescriptionNorms/EditTestDescriptionNorms'
/* Counsellor Pages */
import CounsellorDashboard from '../Views/counselor/CounsellorDashboard'
import NoSlotsSet from '../Views/counselor/Availability/NoSlotsSet'
import Availability from '../Views/counselor/Availability'
import SetAvailability from '../Views/counselor/Availability/SetAvailability'
import Session from '../Views/counselor/Session'
import SessionDetails from '../Views/counselor/Session/SessionDetails'
import CancelSessionDetails from '../Views/counselor/Session/CancelSessionDetails'
import RescheduleSessionDetails from '../Views/counselor/Session/RescheduleSessionDetails'
/* SoftwareMatrix */
import SoftwareMatrix from '../Views/admin/SoftwareMatrix'
import AddNewSoftwareMatrix from '../Views/admin/SoftwareMatrix/AddNewSoftwareMatrix'
import EditSoftwareMatrix from '../Views/admin/SoftwareMatrix/EditSoftwareMatrix'
import ViewSoftwareMatrix from '../Views/admin/SoftwareMatrix/ViewSoftwareMatrix'
/* Career Profile */
import CareerProfile from '../Views/admin/CareerProfile'
import AddNewCareerProfile from '../Views/admin/CareerProfile/AddNewCareerProfile'
import EditCareerProfile from '../Views/admin/CareerProfile/EditCareerProfile'
import ViewCareerProfile from '../Views/admin/CareerProfile/ViewCareerProfile'
import Settings from '../Views/counselor/Settings'
import MyProfile from '../Views/counselor/Settings/MyProfile'
import EditMyProfile from '../Views/counselor/Settings/EditMyProfile'

// Center Pages
import CenterDashboard from '../Views/Center/CenterDashboard'
import CenterEditmyprofile from '../Views/Center/Settings/EditMyProfile'
import CenterMyProfile from '../Views/Center/Settings/MyProfile'

function RoutesFile () {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route exact path='/' element={<PublicRoute element={<Login />} />} />
        <Route
          exact
          path='/login'
          element={<PublicRoute element={<Login />} />}
        />
        <Route
          exact
          path='/signup'
          element={<PublicRoute element={<SignUp />} />}
        />
        <Route
          exact
          path='/reset-password'
          element={<PublicRoute element={<ResetPassword />} />}
        />
        <Route
          exact
          path='/one-time-password'
          element={<PublicRoute element={<OneTimePassword />} />}
        />
        <Route
          exact
          path='/forgot-password'
          element={<PublicRoute element={<ForgotPassword />} />}
        />
        <Route
          exact
          path='/login-with-otp'
          element={<PublicRoute element={<LoginWithOtp />} />}
        />
        <Route
          exact
          path='/admin/login'
          element={<PublicRoute element={<Login />} />}
        />
        <Route
          exact
          path='/api/admin/reset-password/:token'
          element={<PublicRoute element={<ResetPassword />} />}
        />
        <Route
          exact
          path='/admin/forgot-password'
          element={<PublicRoute element={<ForgotPassword />} />}
        />
        <Route exact path='/' element={<PublicRoute element={<Login />} />} />

        {/* Private Routes */}
        <Route
          exact
          path='/dashboard'
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          exact
          path='/kycdetails'
          element={<PublicRoute element={<KYCDetails />} />}
        />
        <Route
          exact
          path='/educationdetails'
          element={<PublicRoute element={<EducationDetails />} />}
        />
        {/* University */}
        <Route
          exact
          path='/university-management'
          element={<PrivateRoute element={<UniversityManagement />} />}
        />
        <Route
          exact
          path='/university-management/add-new-university'
          element={<PrivateRoute element={<AddNewUniversity />} />}
        />
        <Route
          exact
          path='/university-management/edit-university/:id'
          element={<PrivateRoute element={<EditUniversity />} />}
        />
        <Route
          exact
          path='/university-management/view-university/:id'
          element={<PrivateRoute element={<ViewUniversity />} />}
        />
        {/* State */}
        <Route
          exact
          path='/state-management'
          element={<PrivateRoute element={<StateManagement />} />}
        />
        <Route
          exact
          path='/state-management/add-new-state'
          element={<PrivateRoute element={<AddNewState />} />}
        />
        <Route
          exact
          path='/state-management/edit-state/:id'
          element={<PrivateRoute element={<EditState />} />}
        />
        <Route
          exact
          path='/state-management/view-state/:id'
          element={<PrivateRoute element={<ViewState />} />}
        />
        {/* City */}
        <Route
          exact
          path='/city-management'
          element={<PrivateRoute element={<CityManagement />} />}
        />
        <Route
          exact
          path='/city-management/add-new-city'
          element={<PrivateRoute element={<AddNewCity />} />}
        />
        <Route
          exact
          path='/city-management/edit-city/:id'
          element={<PrivateRoute element={<EditCity />} />}
        />
        <Route
          exact
          path='/city-management/view-city/:id'
          element={<PrivateRoute element={<ViewCity />} />}
        />

        {/* Grade Module Routes */}
        <Route
          exact
          path='/grade-management'
          element={<PrivateRoute element={<GradeManagement />} />}
        />
        <Route
          exact
          path='/grade-management/add-new-grade'
          element={<PrivateRoute element={<AddNewGrade />} />}
        />
        <Route
          exact
          path='/grade-management/edit-grade/:id'
          element={<PrivateRoute element={<EditGrade />} />}
        />
        <Route
          exact
          path='/grade-management/view-grade/:id'
          element={<PrivateRoute element={<ViewGrade />} />}
        />

        {/* Qualification Module Routes */}
        <Route
          exact
          path='/qualification-management'
          element={<PrivateRoute element={<QualificationMangement />} />}
        />
        <Route
          exact
          path='/grade-management/edit-grade/:id'
          element={<PrivateRoute element={<EditGrade />} />}
        />
        <Route
          exact
          path='/grade-management/view-grade/:id'
          element={<PrivateRoute element={<ViewGrade />} />}
        />
        <Route
          exact
          path='/qualification-management/add-new-qualification'
          element={<PrivateRoute element={<AddNewQualification />} />}
        />
        <Route
          exact
          path='/qualification-management/edit-qualification/:id'
          element={<PrivateRoute element={<EditQualification />} />}
        />
        <Route
          exact
          path='/qualification-management/view-qualification/:id'
          element={<PrivateRoute element={<ViewQualification />} />}
        />

        {/* Board Module Routes */}
        <Route
          exact
          path='/board-management'
          element={<PrivateRoute element={<BoardManagement />} />}
        />
        <Route
          exact
          path='/board-management/add-new-board'
          element={<PrivateRoute element={<AddNewBoard />} />}
        />
        <Route
          exact
          path='/board-management/edit-board/:id'
          element={<PrivateRoute element={<EditBoard />} />}
        />
        <Route
          exact
          path='/board-management/view-board/:id'
          element={<PrivateRoute element={<ViewBoard />} />}
        />
        {/* School Module Routes */}
        <Route
          path='/school-management/add-new-school'
          element={<PrivateRoute element={<AddNewSchool />} />}
        />
        <Route
          exact
          path='/school-management'
          element={<PrivateRoute element={<SchoolManagement />} />}
        />
        <Route
          exact
          path='/school-management/add-new-school'
          element={<PrivateRoute element={<AddNewSchool />} />}
        />

        <Route
          exact
          path='/school-management'
          element={<PrivateRoute element={<SchoolManagement />} />}
        />
        <Route
          exact
          path='/school-management/add-new-school'
          element={<PrivateRoute element={<AddNewSchool />} />}
        />
        <Route
          exact
          path='/school-management/edit-school/:id'
          element={<PrivateRoute element={<EditSchool />} />}
        />
        <Route
          exact
          path='/school-management/view-school/:id'
          element={<PrivateRoute element={<ViewSchool />} />}
        />

        {/* Package Management */}
        <Route
          exact
          path='/package-management'
          element={<PrivateRoute element={<PackageManagement />} />}
        />
        <Route
          exact
          path='/package-management/add-new-package'
          element={<PrivateRoute element={<AddNewPackage />} />}
        />
        <Route
          exact
          path='/package-management/edit-package/:id'
          element={<PrivateRoute element={<EditPackage />} />}
        />
        <Route
          exact
          path='/package-management/view-package/:id'
          element={<PrivateRoute element={<ViewPackage />} />}
        />
        <Route
          exact
          path='/test-management/questions'
          element={<PrivateRoute element={<Questions />} />}
        />
        <Route
          exact
          path='/test-management/questions/add-new-questions'
          element={<PrivateRoute element={<AddNewQuestions />} />}
        />
        <Route
          exact
          path='/test-management/question/edit-questions/:id'
          element={<PrivateRoute element={<EditQuestions />} />}
        />
        <Route
          exact
          path='/test-management/question/view-questions/:id'
          element={<PrivateRoute element={<ViewQuestions />} />}
        />
        <Route
          exact
          path='/test-management/main-category'
          element={<PrivateRoute element={<MainCategory />} />}
        />
        <Route
          exact
          path='/test-management/main-category/add-new-maincategory'
          element={<PrivateRoute element={<AddNewMainCategory />} />}
        />
        <Route
          exact
          path='/test-management/main-category/view-maincategory/:id'
          element={<PrivateRoute element={<ViewMainCategory />} />}
        />
        <Route
          exact
          path='/test-management/main-category/edit-maincategory/:id'
          element={<PrivateRoute element={<EditMainCategory />} />}
        />
        <Route
          exact
          path='/test-management/sub-category'
          element={<PrivateRoute element={<SubCategory />} />}
        />
        <Route
          exact
          path='/test-management/sub-category/add-new-subcategory'
          element={<PrivateRoute element={<AddNewSubCategory />} />}
        />
        <Route
          exact
          path='/test-management/sub-category/view-subcategory/:id'
          element={<PrivateRoute element={<ViewSubCategory />} />}
        />
        <Route
          exact
          path='/test-management/sub-category/edit-subcategory/:id'
          element={<PrivateRoute element={<EditSubCategory />} />}
        />
        {/* Norms Management */}
        <Route
          exact
          path='/norms-management'
          element={<PrivateRoute element={<NormsManagement />} />}
        />
        <Route
          exact
          path='/norms-management/add-new-norms'
          element={<PrivateRoute element={<AddNewNorms />} />}
        />
        <Route
          exact
          path='/norms-management/view-norms/:id'
          element={<PrivateRoute element={<ViewNorms />} />}
        />
        <Route
          exact
          path='/norms-management/edit-norms/:id'
          element={<PrivateRoute element={<EditNorms />} />}
        />
        <Route
          exact
          path='/norms-management/gradenorms'
          element={<PrivateRoute element={<GradeNorms />} />}
        />
        <Route
          exact
          path='/norms-management/gradenorms/add-new-gradenorms'
          element={<PrivateRoute element={<AddNewGradeNorms />} />}
        />
        <Route
          exact
          path='/norms-management/gradenorms/view-gradenorms/:id'
          element={<PrivateRoute element={<ViewGradeNorms />} />}
        />
        <Route
          exact
          path='/norms-management/gradenorms/edit-gradenorms/:id'
          element={<PrivateRoute element={<EditGradeNorms />} />}
        />
        <Route
          exact
          path='/norms-management/test-time-norms'
          element={<PrivateRoute element={<TestTimeNorms />} />}
        />
        <Route
          exact
          path='/norms-management/test-time-norms/add-new-test-time-norms'
          element={<PrivateRoute element={<AddNewTestTimeNorms />} />}
        />
        <Route
          exact
          path='/norms-management/test-time-norms/view-test-time-norms/:id'
          element={<PrivateRoute element={<ViewTestTimeNorms />} />}
        />
        <Route
          exact
          path='/norms-management/test-time-norms/edit-test-time-norms/:id'
          element={<PrivateRoute element={<EditTestTimeNorms />} />}
        />
        <Route
          exact
          path='/norms-management/test-description-norms'
          element={<PrivateRoute element={<TestDescriptionNorms />} />}
        />
        <Route
          exact
          path='/norms-management/test-description-norms/add-new-test-description-norms'
          element={<PrivateRoute element={<AddNewTestDescriptionNorms />} />}
        />
        <Route
          exact
          path='/norms-management/test-description-norms/view-test-description-norms/:id'
          element={<PrivateRoute element={<ViewTestDescriptionNorms />} />}
        />
        <Route
          exact
          path='/norms-management/test-description-norms/edit-test-description-norms/:id'
          element={<PrivateRoute element={<EditTestDescriptionNorms />} />}
        />
        <Route
          exact
          path='/counsellor-dashboard'
          element={<PrivateRoute element={<CounsellorDashboard />} />}
        />

        {/* Center Pages  */}
        <Route
          exact
          path='/center-dashboard'
          element={<PrivateRoute element={<CenterDashboard />} />}
        />
        <Route
          exact
          path='/center/settings/editmyprofile'
          element={<PrivateRoute element={<CenterEditmyprofile />} />}
        />
        <Route
          exact
          path='/center/settings/myprofile'
          element={<PrivateRoute element={<CenterMyProfile />} />}
        />
        <Route
          exact
          path='/no-slots-set'
          element={<PrivateRoute element={<NoSlotsSet />} />}
        />
        <Route
          exact
          path='/availability'
          element={<PrivateRoute element={<Availability />} />}
        />
        <Route
          exact
          path='/set-availability'
          element={<PrivateRoute element={<SetAvailability />} />}
        />
        <Route
          exact
          path='/session'
          element={<PrivateRoute element={<Session />} />}
        />
        <Route
          exact
          path='/session-details'
          element={<PrivateRoute element={<SessionDetails />} />}
        />
        <Route
          exact
          path='/cancel-session-details'
          element={<PrivateRoute element={<CancelSessionDetails />} />}
        />
        <Route
          exact
          path='/reschedule-session-details'
          element={<PrivateRoute element={<RescheduleSessionDetails />} />}
        />
        <Route
          exact
          path='/reschedule-session-details'
          element={<PrivateRoute element={<RescheduleSessionDetails />} />}
        />
        {/* software matrix */}
        <Route
          exact
          path='/software-matrix'
          element={<PrivateRoute element={<SoftwareMatrix />} />}
        />
        <Route
          exact
          path='/software-matrix/add-new-softwarematrix'
          element={<PrivateRoute element={<AddNewSoftwareMatrix />} />}
        />
        <Route
          exact
          path='/software-matrix/edit-softwarematrix/:id'
          element={<PrivateRoute element={<EditSoftwareMatrix />} />}
        />
        <Route
          exact
          path='/software-matrix/view-softwarematrix/:id'
          element={<PrivateRoute element={<ViewSoftwareMatrix />} />}
        />
        {/* career Profile */}
        <Route
          exact
          path='/career-profile'
          element={<PrivateRoute element={<CareerProfile />} />}
        />
        <Route
          exact
          path='/career-profile/add-new-career-profile'
          element={<PrivateRoute element={<AddNewCareerProfile />} />}
        />
        <Route
          exact
          path='/career-profile/edit-career-profile'
          element={<PrivateRoute element={<EditCareerProfile />} />}
        />
        <Route
          exact
          path='/career-profile/view-career-profile'
          element={<PrivateRoute element={<ViewCareerProfile />} />}
        />
        <Route
          exact
          path='/settings'
          element={<PrivateRoute element={<Settings />} />}
        />
        {/* </Routes> */}
        <Route
          exact
          path='/settings/myprofile'
          element={<PrivateRoute element={<MyProfile />} />}
        />
        <Route
          exact
          path='/settings/my-profile/editmyprofile'
          element={<PrivateRoute element={<EditMyProfile />} />}
        />
      </Routes>
    </>
  )
}
export default RoutesFile
