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
          <CustomizedHeader value={1} />

          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden relative left-[4%] pt-[20px]">
            <CustomizedSideNav value3={true} parentClass="max-h-[600px]" />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-semibold">
                    User Settings
                  </h1>
                </div>
                {/* Tabs */}
                <div className="mt-4 sm:mt-5">
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-[#B9B9B9] w-[150px]">
                      <nav
                        className="-mb-px flex flex-1 space-x-6 xl:space-x-8"
                        aria-label="Tabs"
                      >
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? "page" : undefined}
                            className={classNames(
                              tab.current
                                ? "border-theme text-theme"
                                : "border-transparent text-[#B9B9B9] hover:border-gray-400 hover:text-gray-700",
                              "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-bold"
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
                <PartnerTable />
              </div>
            </main>
            {/* Right sidebar */}
          </div>
        </div>
      </div>
    </>
  );
}
