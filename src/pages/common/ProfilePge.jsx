import AppLayout from "../../components/layout/AppLayout";

import ProfileLayout
from "../../components/layout/ProfileLayout";

import StudentProfileFields
from "../../components/profile/StudentProfileFields";

import AdminProfileFields
from "../../components/profile/AdminProfileFields";
import LibrarianProfileFields from "../../components/profile/LibrarianProfileFields";

export default function ProfilePage() {

    const role =
        localStorage.getItem("role");

    return (

        <AppLayout>

            <ProfileLayout>

                {
                    role === "STUDENT"
                        ? (
                            <StudentProfileFields />
                        )
                        : (
                            <LibrarianProfileFields />
                        )
                }

            </ProfileLayout>

        </AppLayout>

    );

}