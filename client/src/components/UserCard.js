import React from "react";

const UserCard = (key, user) => {
  return (
    <div>
      <div class="text-sm leading-6 hover:cursor-pointer">
        <div class="relative flex flex-col-reverse rounded-lg p-2 bg-myColor3 dark:highlight-white/5">
          <div class="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb2RlcnxlbnwwfDB8fHwxNzEwMTY0NjIzfDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt=""
              class="flex-none w-10 h-10 rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div class="flex-auto">
              <div class="text-base text-myColor1 font-semibold text-sm">
                John Doe
              </div>
              <div class="text-myColor2 text-xs">johndoe@mail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
