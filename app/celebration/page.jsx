"use client";
import PartnerTable from "@/components/UsersTable/PartnerTable";
import CustomizedHeader from "@/components/CustomizedHeader";
import CustomizedSideNav from "@/components/CustomizedSideNav";
const tabs = [
  { name: "Partner", href: "/users-page/partner", current: true },
  { name: "Admin", href: "/users-page/admin", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Partner() {
  return (
    <>
      <div className="flex bg-userTheme h-screen">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <CustomizedHeader value={2} />

          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden relative left-[4%] pt-[20px]">
            <CustomizedSideNav value1={true} parentClass="max-h-[600px]" />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-4xl font-semibold ml-[420px] text-primaryColor">
                    Celebration
                  </h1>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
