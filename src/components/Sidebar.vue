<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
            <ul class="nav flex-column">
            <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" to="/turmas">
                    <i class="fas fa-chalkboard-teacher"></i>
                    Turmas
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" to="/alunos">
                    <i class="fas fa-user-friends"></i>
                    Alunos
                </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                <i class="fas fa-address-book"></i>
                Diário
                </a>
            </li>
            <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" to="/usuarios">
                    <i class="fas fa-users"></i>
                    Usuários
                </router-link>
            </li>
            </ul>
        </div>
    </nav>
</template>