

// export default function UsStudiesAbout() {
//     return (
//
//             <div className="flex flex-col text-center">
//                 <div className="container mx-auto flex h-full w-full flex-col items-center justify-center text-center">
//                     <h1 className={"text-3xl tracking-tight text-zinc-400 sm:text-4xl"}>Asphire</h1>
//                     {/*<p className={"text-3xl text-edge-outline bg-zinc-100  text-transparent bg-clip-text font-bold tracking-tight text-zinc-100 sm:text-4xl mt-2"}>Job Agency</p>*/}
//                     <p className="text-4xl bg-clip-text text-transparent sm:text-4xl font-bold tracking-tight mt-2 bg-gradient-to-r from-pink-500 via-red-500 to-pink-600">
//                         Education Agency
//                     </p>
//                 </div>
//
//                 <p>
//                 </p>
//
//             </div>
//     )
// }
import React from 'react';
import { Settings, File, Users, GraduationCap, Rocket, HelpCircle } from 'lucide-react';
import {Card} from "@/app/components/card";

export default function HomePage() {
    return (
        <div className="flex flex-col text-center text-white">
            <div className="container mx-auto flex h-full w-full flex-col items-center justify-center text-center">
                <h1 className="text-3xl tracking-tight text-zinc-400 sm:text-4xl">Asphire</h1>
                <p className="text-4xl bg-clip-text text-transparent sm:text-4xl font-bold tracking-tight mt-2 bg-gradient-to-r from-pink-500 via-red-500 to-pink-600">
                    Education Agency
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
                <div className="flex flex-col md:flex-row">
                    <Card>
                        <Settings size={48} className="mx-auto mb-4"/>
                    </Card>
                    <div className="text-left p-4">
                        <h2>User-friendly Platform</h2>
                        <p>Our user-friendly platform streamlines the entire process of university applications, saving you valuable time and energy.</p>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row-reverse">
                    <Card>
                        <File size={48} className="mx-auto mb-4"/>
                    </Card>
                    <div className="text-left p-4">
                        <h2>Track Application Status</h2>
                        <p>Stay informed throughout the process. You can easily monitor the progress of your applications with Asphire.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <Card>
                        <Users size={48} className="mx-auto mb-4"/>
                    </Card>
                    <div className="text-left p-4">
                        <h2>Interview Preparation</h2>
                        <p>Our experienced team provides comprehensive interview preparation, giving you the necessary skills to succeed.</p>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row-reverse">
                    <Card>
                        <GraduationCap size={48} className="mx-auto mb-4"/>
                    </Card>
                    <div className="text-left p-4">
                        <h2>After-Education Guidance</h2>
                        <p>We provide valuable guidance to help you transition smoothly into the professional world after graduation.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <Card>
                        <Rocket size={48} className="mx-auto mb-4"/>
                    </Card>
                    <div className="text-left p-4">
                        <h2>Job Agency Services</h2>
                        <p>As well as being an education agency, we also offer job agency services to connect students with the right job prospects.</p>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row-reverse">
                    <Card>
                        <HelpCircle size={48} className="mx-auto mb-4"/>
                    </Card>
                    <div className="text-left p-4">
                        <h2>Join Asphire Today!</h2>
                        <p>Unlock a world of possibilities with Asphire. Let us be your trusted partner in shaping your future.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
