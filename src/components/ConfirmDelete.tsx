import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from 'react-router-dom';
import { useNote } from "./NoteLayout";
import toast from "react-hot-toast";

type NoteProps = {
  onDelete: (id: string) => void;
}

export default function confirmDelete({onDelete}: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  const notify = () => toast('Note deleted.')

  confirmAlert({
    title: 'Confirm Delete',
    message: `Are you sure you want to delete ${note.id}?`,
    buttons: [
      { label: 'Cancel' },
      {
        label: 'Delete',
        onClick: () => {
          {notify}
          onDelete(note.id)
          navigate("/")
        }
      }
    ]
  });
}