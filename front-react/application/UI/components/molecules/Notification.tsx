import React, {FC, Fragment, ReactNode} from "react";
import {Transition} from "@headlessui/react";

type NotificationProps = {
    children: ReactNode;
}

const Notification: FC<NotificationProps> = ({children}) => {
    return (
        <Transition
            show={true}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2 sm:opacity-0"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0 sm:opacity-100"
            leave="transition transform ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            {children}
        </Transition>
    )
}

export default Notification;