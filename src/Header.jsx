import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
  } from "@heroui/react";
  
  
   function Navberfull() {
  
    return (
      <Navbar disableAnimation isBlurred={false} maxWidth="xl" className="bg-transparent w-full backdrop-blur-sm">
        <NavbarContent>
            <NavbarItem>
                <img src="/Images/logo.png" alt="" />
            </NavbarItem>
        </NavbarContent>
    
        <NavbarContent justify="end">
          <NavbarItem>
            <Button className="text-[#772AB3] border border-[#772AB3] rounded-full" as={Link} color="warning" href="#" variant="flat">
               Contact
            </Button>
          </NavbarItem>
        </NavbarContent>
  
      
      </Navbar>
    );
  }
  
  export default Navberfull;