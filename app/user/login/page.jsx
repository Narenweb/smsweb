"use client";
import PartnerTable from "@/components/UsersTable/PartnerTable";
import CustomizedHeader from "@/components/CustomizedHeader";
import CustomizedSideNav from "@/components/CustomizedSideNav";

export default function Partner() {
  return (
    <>
      <div className="flex bg-userTheme h-screen">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden relative left-[4%] pt-[20px]">
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-4xl font-semibold ml-[420px] text-theme">
                    User's Login
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
