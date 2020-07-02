<template>
  <div>
    <!-- <div class="row">
      <div class="col-sm-6">
        <textarea v-model="content" class="form-control" rows="20"></textarea>
      </div>
      <div class="col-sm-6">
        <p v-html="convertToMarkdown" class="preview"></p>
      </div>
    </div>-->
    <div class="main">
      <div class="left-side">
        <input
          class="title"
          type="text"
          placeholder="New Note!"
          v-if="selectedId"
          v-model="selectedNote.title"
        />
        <input type="text" placeholder="Title Here!" class="title" v-model="title" v-else />
        <button class="btn btn-success" @click="addNote" :title="notes.length + ' note(s)'">
          <i class="material-icons" style="float: right">add</i>
          <span style="float: left">Add Note</span>
        </button>
        <button class="btn btn-danger" @click="removeNote">
          <span style="float: left">Delete</span>
          <span class="material-icons" style="float: right">delete</span>
        </button>
        <button class="btn btn-primary" @click="selectedNote.favourite = !selectedNote.favourite">
          <span style="float: left">Favourite</span>
          <span
            class="material-icons"
            style="float: right"
          >{{ selectedId && selectedNote.favourite ? 'star' : 'star_border'}}</span>
        </button>
        <button class="btn btn-warning" @click="selectedId = null">
          <span style="float: left">Empty note</span>
          <span class="material-icons" style="float: right">hourglass_empty</span>
        </button>
        <ul class="list-group">
          <li
            v-for="note in notes"
            :key="note.id"
            @click="selectNote(note)"
            :class="{ selectedNote: note.id === selectedId }"
          >
            <span>{{ note.title }}</span>
          </li>
        </ul>
      </div>
      <textarea class="form-control" rows="20" v-if="selectedId" v-model="selectedNote.content"></textarea>
      <textarea
        class="form-control"
        rows="20"
        v-else
        placeholder="Write markdown here!"
        v-model="content"
      ></textarea>
      <p v-html="markdownPreview"></p>
    </div>
  </div>
</template>

<script>
import marked from "marked";
// var _ = require("lodash");
export default {
  data() {
    return {
      content: "",
      title: "",
      selectedId: null,
      notes: JSON.parse(localStorage.getItem("notes")) || []
    };
  },
  watch: {
    notes: {
      handler: "saveNotes",
      deep: true
    }
  },
  computed: {
    selectedNote() {
      // We return the matching note with selectedId
      return this.notes.find(note => note.id === this.selectedId);
    },
    markdownPreview() {
      return this.selectedNote
        ? marked(this.selectedNote.content)
        : marked(this.content);
    }
  },
  methods: {
    // saveNote() {
    //   console.log("new value: ", this.content);
    //   localStorage.setItem("content", this.content);
    // }
    addNote() {
      const time = Date.now();
      const note = {
        id: String(time),
        title: this.title,
        content: this.content,
        created: time,
        favourite: false
      };
      this.notes.push(note);
    },
    selectNote(note) {
      this.selectedId = note.id;
    },
    saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
      console.log("Notes are saved!");
    },
    removeNote() {
      if (this.selectedNote && confirm("Do you want to remove this note?")) {
        const index = this.notes.indexOf(this.selectedNote);
        if (index !== -1) {
          this.notes.splice(index, 1);
          this.selectedId = null;
        }
      }
    }
  }

  // created() {
  //   console.log("saved note: ", localStorage.getItem("content"));
  //   this.content =
  //     localStorage.getItem("content") || "You can write in markdown.";
  // }
};
</script>

<style lang="scss">
body {
  padding: 20px;
}
.main {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  .left-side {
    display: flex;
    flex-direction: column;
    margin: 5px;
    input,
    button {
      margin: 10px;
    }
    ul {
      list-style: none;
      li {
        padding: 5px;
        transition: background-color 1s;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        &:hover {
          background-color: #218838;
          color: white;
          cursor: pointer;
        }
        i {
          display: inline-block;
        }
      }
    }
  }
  p {
    margin-left: 10px;
    flex-basis: 600px;
  }
  .title {
    background: transparent;
    border: none;
    border-bottom: 2px solid silver;
  }

  // div {
  //   width: 30%;
  //   height: 500px;
  //   background-color: #e0e0e0;
  //   text-align: center;
  //   button {
  //     margin: 20px;
  //     background-color: #2e7d32;
  //   }
  //   input {
  //     margin: 10px;
  //   }
  //   ul {
  //     margin: 10px;
  //     display: flex;
  //     flex-direction: column;
  //   }
  //   li {
  //     padding: 10px;
  //     list-style: none;
  //     &:hover {
  //       background-color: #43a047;
  //       cursor: pointer;
  //     }
  //   }
  // }
  .selectedNote {
    background-color: #43a047;
  }
  .form-control {
    width: 100%;
  }
}
.preview {
  margin: 0;
  width: 100%;
}
</style>
